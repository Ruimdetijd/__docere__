import * as React from 'react'
import { EntryState } from '../index'
import FacsimilePanel from './facsimile'

import { PanelsWrapper } from '../index.components'
import TextPanel from './text'
import XmlPanel from './xml'
import { AsideTab } from '../../constants'

export type PanelsProps = AppState & EntryState & {
	setActiveId: SetActiveId
	setActiveFacsimile: (path: string) => void
	togglePanelOrientation: () => void
	toggleWordWrap: () => void
}
export interface PanelsState {
	components: DocereComponents
	highlight: string[]
}
export default class Panels extends React.Component<PanelsProps, PanelsState> {
	state: PanelsState = {
		components: {},
		highlight: [],
	}

	async componentDidMount() {
		let components: DocereComponents = {}
		try {
			const { default: getComponents } = await import(`../../project-components/${this.props.config.slug}`) as { default : GetComponents }
			components = getComponents(this.props.config)
		} catch (err) {
			console.error(`No components found for project ${this.props.config.slug}`)	
		}
		this.setState({ components })
	}

	shouldComponentUpdate(nextProps: PanelsProps) {
		// Only update when the viewport has not changed
		return this.props.viewport === nextProps.viewport ||
			this.props.asideTab === AsideTab.TextData ||
			nextProps.asideTab === AsideTab.TextData
	}

	render() {
		const customProps: DocereComponentProps = {
			activeFacsimilePath: this.props.activeFacsimilePath,
			activeId: this.props.activeId,
			activeListId: this.props.activeListId,
			config: this.props.config,
			facsimiles: this.props.facsimiles,
			insideNote: false,
			setActiveFacsimile: this.props.setActiveFacsimile,
			setActiveId: this.props.setActiveId,
			setEntryId: this.props.setEntryId,
			textLayer: null,
			viewport: this.props.viewport,
		}

		const activePanels = this.props.activePanels.filter(ap => ap.active)

		return (
			<PanelsWrapper
				activePanels={activePanels}
				orientation={this.props.orientation}
			>
				{
					activePanels.map(ap =>
						ap.type === TextLayerType.Facsimile ?
							<FacsimilePanel
								activeFacsimilePath={this.props.activeFacsimilePath}
								facsimiles={this.props.facsimiles}
								key={ap.id}
								orientation={this.props.orientation}
							/> :
							ap.type === TextLayerType.TextLayer ?
								<TextPanel
									{...this.props}
									{...this.state}
									customProps={customProps}
									key={ap.id}
									textLayerConfig={ap}
								/> :
								<XmlPanel
									config={ap}
									key={ap.id}
									doc={this.props.doc}
								/>
					)
				}
			</PanelsWrapper>
		)
	}
}
