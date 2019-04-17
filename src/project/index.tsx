import * as React from 'react'
import HucFacetedSearch, { FullTextSearch, Facets, BooleanFacet, ListFacet, RangeFacet, Reset } from 'huc-faceted-search'
import { State as AppState } from '../index'
import { RouteComponentProps } from 'react-router'
// TODO remove dep on huc-ui-components. Plus, a search result should be configurable per project
import { HucSearchResults } from 'huc-ui-components'
import ResultBodyComponent from './result-body'
import styled from '@emotion/styled'
import { debounce } from '../utils';

const Wrapper = styled.div`
	display: grid;
    grid-template-columns: 320px auto;
    grid-column-gap: 64px;
    padding: 64px;
	
	h2 {
		grid-column: 1 / span 2;
	}
`

interface MatchParams {
	slug: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
}
interface State {
	// filename: string
	request: any
	searchResults: any
}
export default class Project extends React.Component<Props, State> {
	private searchRef: React.RefObject<HucFacetedSearch>

	state: State = {
		request: null,
		searchResults: {
			hits: [],
			total: 0
		}
	}

	constructor(props: Props) {
		super(props)
		this.searchRef = React.createRef()
	}

	componentDidMount() {
		this.props.setProject(this.props.match.params.slug)
		document.addEventListener('scroll', this.onScrollDebounced)
	}

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return (
			this.state !== nextState ||
			this.props.project == null && nextProps.project != null ||
			this.props.project.slug !== nextProps.project.slug
		)
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.onScrollDebounced)
	}

	render() {
		if (this.props.project == null) return null
		console.log(this.state.searchResults)

		return (
			<Wrapper>
				<HucFacetedSearch
					backend="elasticsearch"
					onChange={this.handleChange}
					ref={this.searchRef}
					url={`/search/${this.props.project.slug}/_search`}
				>
					<FullTextSearch autoSuggest={async () => []} />
					<Reset />
					<Facets>
						{
							this.props.project.metadata_fields
								.filter(field => field.es_data_type !== 'null')
								.sort((f1, f2) => f1.sortorder - f2.sortorder)
								.map(field => 
									field.es_data_type === 'boolean' ?
										<BooleanFacet
											field={field.slug}
											key={field.slug}
											labels={["Nee", "Ja"]}
											title={field.title}
										/> :
										field.es_data_type === 'date' ?
											<RangeFacet
												field={field.slug}
												key={field.slug}
												title={field.title}
												type="timestamp"
											/> :
											<ListFacet
												field={field.slug}
												key={field.slug}
												title={field.title}
											/>
								)
						}
					</Facets>
				</HucFacetedSearch>
				<HucSearchResults
					resultBodyComponent={ResultBodyComponent(this.props.project.slug)}
					searchResults={this.state.searchResults}
				/>
			</Wrapper>
		)
	}

	private handleChange = (req: any, searchResults: any, query: string) => {
		if (query.length) this.props.setSearchQuery(query)
		this.setState({ request: req, searchResults })
	}

	private onScroll = () => {
		const { documentElement: doc } = document
		if (doc.scrollHeight - (doc.scrollTop + doc.clientHeight) < doc.scrollHeight * .1) {
			this.searchRef.current.getNext()
		}
	}

	private onScrollDebounced = debounce(this.onScroll, 100)
}
