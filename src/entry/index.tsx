import * as React from 'react'
import components from '../components'
import { RouteComponentProps } from 'react-router'
import { State as AppState } from '../index'
import Dispilio from 'dispilio'

interface MatchParams {
	entryId: string
	projectSlug: string
	xmlId: string
}
export type Props = AppState & RouteComponentProps<MatchParams>
export default class Entry extends React.Component<Props, ContextState> {
	components = components

	async componentDidMount() {
		const { projectSlug, xmlId, entryId } = this.props.match.params
		await this.props.setEntry(projectSlug, xmlId, entryId)
		await import(`../components/${projectSlug}`).then(components => {
			this.components = {...this.components, ...components.default}
			this.forceUpdate()
		})
	}

	render() {
		if (this.props.project == null || this.props.xmlio == null) return null

		const extractedMetadata: Metadata = this.props.project.hasOwnProperty('metadata_extractor') && this.props.project.metadata_extractor != null ?
			this.props.project.metadata_extractor(this.props.xmlio) :
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
				xmlio={this.props.xmlio}
			/>
		)
	}
}
