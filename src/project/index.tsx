import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from '@emotion/styled'
import HucFacetedSearch, { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'
import { State as AppState } from '../index'
import ResultBodyComponent from './result-body'

const Wrapper = styled.div`
	margin-top: 64px;
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
	}

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		return (
			this.state !== nextState ||
			this.props.project == null && nextProps.project != null ||
			this.props.project.slug !== nextProps.project.slug
		)
	}

	render() {
		if (this.props.project == null) return null

		const fields = this.props.project.metadata_fields
			.filter(field => field.es_data_type !== 'null')
			.sort((f1, f2) => f1.sortorder - f2.sortorder)

		return (
			<Wrapper>
				<HucFacetedSearch
					backend="elasticsearch"
					onChange={this.handleChange}
					ref={this.searchRef}
					resultBodyComponent={ResultBodyComponent(this.props.project.slug)}
					url={`/search/${this.props.project.slug}/_search`}
				>
					{
						fields.map(field => 
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
				</HucFacetedSearch>
			</Wrapper>
		)
	}

	private handleChange = (changeResponse: OnChangeResponse) => {
		if (changeResponse.query.length) this.props.setSearchQuery(changeResponse.query)
		this.setState({ request: changeResponse.request, searchResults: changeResponse.response })
	}
}
