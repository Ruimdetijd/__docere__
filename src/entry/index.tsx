import * as React from 'react'
import components from '../components'
import { RouteComponentProps } from 'react-router'
import { State as AppState } from '../index'
import Dispilio from 'dispilio'
import { fetchPost } from '../utils'

interface MatchParams {
	entryId: string
	projectSlug: string
	xmlId: string
}
export type Props = AppState & RouteComponentProps<MatchParams>
interface State {
	highlight: string[]
}
export default class Entry extends React.Component<Props, State> {
	components = components

	state: State = {
		highlight: []
	}

	async componentDidMount() {
		const { projectSlug, xmlId, entryId } = this.props.match.params
		await this.props.setEntry(projectSlug, xmlId, entryId)
		await import(`../components/${projectSlug}`).then(components => {
			this.components = {...this.components, ...components.default}
			this.forceUpdate()
		})
		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.searchQuery !== this.props.searchQuery) {
			this.setHighlight()
		}
	}

	render() {
		if (this.props.project == null || this.props.xmlio == null) return null

		const extractedMetadata: Metadata = this.props.project.hasOwnProperty('metadata_extractor') && this.props.project.metadata_extractor != null ?
			this.props.project.metadata_extractor(this.props.xmlio, this.props.match.params.xmlId) :
			[]

		const metadata = this.props.project.metadata_fields
			.filter(field => field.type === 'meta' && field.aside)
			.sort((f1, f2) => f1.sortorder - f2.sortorder)
			.map(field => {
				const metadata = extractedMetadata.find(([key]) => `m_${key}` === field.slug)
				return metadata == null ? null : [field.title, metadata[1]] as [string, string]
			})
			.filter(m => m != null)

		const extractors = this.props.project.metadata_fields
			.filter(field => field.type === 'text' && field.aside)
			.sort((f1, f2) => f1.sortorder - f2.sortorder)
			.map(field => {
				const extractor = this.props.project.extractors.find(ex => ex.id === field.slug)
				if (extractor == null) return null
				extractor.title = field.title
				return extractor
			})
			.filter(m => m != null)

		return (
			<Dispilio
				components={this.components}
				extractors={extractors}
				facsimileExtractor={this.props.project.facsimile_extractor}
				metadata={metadata}
				highlight={this.state.highlight}
				xmlio={this.props.xmlio}
			/>
		)
	}

	private async setHighlight() {
		const response = await fetchPost(`/search/${this.props.project.slug}/_search`, {
			_source: false,
			query: {
				bool: {
					must: [
						{
							query_string: {
								query: this.props.searchQuery
							}
						},
						{
							match: {
								id: this.props.match.params.xmlId
							}
						}
					]
				}
			},
			highlight: {
				fields: {
					text: {}
				},
				require_field_match: false,
				fragment_size: 0,
				number_of_fragments: 1000
			}
		})

		let hits = []
		if (!response.hasOwnProperty('error') && response.hits.hits.length) {
			hits = response.hits.hits[0].highlight.text.reduce((set: Set<string>, hit: string) => {
				hit = hit.slice(hit.indexOf('<em>') + 4, hit.indexOf('</em>'))
				set.add(hit)
				return set
			}, new Set())
		}

		this.setState({ highlight: [...hits] })
	}
}
