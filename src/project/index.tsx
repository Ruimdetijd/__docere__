import * as React from 'react'
import { Link } from 'react-router-dom'
import HucFacetedSearch, { FullTextSearch, Facets, ListFacet } from 'huc-faceted-search'
import { State as AppState } from '../index'
import { RouteComponentProps } from 'react-router'
import splitters from './splitters'

interface MatchParams {
	slug: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
}
interface State {
	filename: string
}
export default class Project extends React.Component<Props, State> {
	state: State = {
		filename: null
	}

	async componentDidMount() {
		this.props.setProject(this.props.match.params.slug)
	}

	render() {
		if (this.props.project == null) return null

		return (
			<>
				<h2>{`Project: ${this.props.project.title || this.props.project.slug}`}</h2>
				{
					this.props.project.metadata_fields != null && this.props.project.metadata_fields.length &&
					<HucFacetedSearch
						backend="elasticsearch"
						onChange={(req, res) => {
							console.log(req, res)
						}}
						url={`/search/${this.props.project.slug}/_search`}
					>
						<FullTextSearch autoSuggest={async () => ['haha']} />
						<Facets>
							{
								this.props.project.metadata_fields.map(field => 
									<ListFacet
										field={field.slug}
										key={field.slug}
										title={field.title}
									/>
								)
							}
						</Facets>
					</HucFacetedSearch>
				}
				<div>
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
				}
			</>
		)
	}
}