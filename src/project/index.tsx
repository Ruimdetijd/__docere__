import * as React from 'react'
import HucFacetedSearch, { FullTextSearch, Facets, BooleanFacet, ListFacet, RangeFacet, Reset } from 'huc-faceted-search'
import { State as AppState } from '../index'
import { RouteComponentProps } from 'react-router'
import { HucSearchResults } from 'huc-ui-components'
import ResultBodyComponent from './result-body'
import styled from '@emotion/styled'

const Wrapper = styled.div`
	display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 4em auto;
    grid-column-gap: 6%;
    padding: 0px 4%;
	
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
	searchResults: any
}
export default class Project extends React.Component<Props, State> {
	state: State = {
		searchResults: {
			hits: [],
			total: 0
		}
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

		return (
			<Wrapper>
				<HucFacetedSearch
					backend="elasticsearch"
					onChange={(_req, searchResults) => {
						this.setState({ searchResults })
					}}
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

				{/* <div>
					<h3>XML documents</h3>
					<ul>
						{
							this.props.project.files.map(filename =>
								<li key={filename}>
									<Link to={`/projects/${this.props.project.slug}/xml/${filename}`}>{filename}</Link>
									{
										splitters.hasOwnProperty(this.props.project.slug) &&
										<span
											onClick={() => {
												this.setState({ filename })
												this.props.setXml(this.props.match.params.slug, filename)
											}}
										>
											split
										</span>
									}
									{
										this.props.project.xml.hasOwnProperty(filename) &&
										<span>{this.props.project.xml[filename].size}</span>
									}
								</li>
							)
						}
					</ul>
				</div>
				{
					splitters.hasOwnProperty(this.props.project.slug) &&
					this.state.filename != null &&
					this.props.project.entries.hasOwnProperty(this.state.filename) &&
					this.props.project.entries[this.state.filename].length &&
					<div>
						<h3>Entries</h3>
						<ul>
							{
								this.props.project.entries[this.state.filename].map((_xmlio, index) =>
									<li key={index}>
										<Link to={`/projects/${this.props.project.slug}/xml/${this.state.filename}/entries/${index}`}>{index}</Link>
									</li>
								)
							}
						</ul>
					</div>
				} */}
			</Wrapper>
		)
	}
}
