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
		const metadata: Metadata = this.props.project.hasOwnProperty('metadata_extractor') && this.props.project.metadata_extractor != null ?
			this.props.project.metadata_extractor(this.props.xmlio) :
			[]

		return (
			<Dispilio
				components={this.components}
				extractors={this.props.project.extractors}
				facsimileExtractor={this.props.project.facsimile_extractor}
				metadata={metadata}
				xmlio={this.props.xmlio}
			/>
		)
	}
}
