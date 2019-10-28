import * as React from 'react'
import { EntryState, EntryProps } from '../index'
import FacsimilePanel from './facsimile'

import { PanelsWrapper } from '../index.components'
import TextPanel from './text'
import XmlPanel from './xml'
import { AsideTab } from '../../constants'

export type PanelsProps = EntryProps & EntryState & {
	setActiveId: SetActiveId
	setActiveFacsimile: (path: string) => void
	togglePanelOrientation: () => void
	toggleWordWrap: () => void
}
export interface PanelsState {
	facsimileHighlight: [number, number, number, number]
	highlight: string[]
}
export default class Panels extends React.Component<PanelsProps, PanelsState> {
	state: PanelsState = {
		facsimileHighlight: null,
		highlight: [],
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
			config: this.props.configData.config,
			facsimiles: this.props.entry.facsimiles,
			insideNote: false,
			setActiveFacsimile: this.props.setActiveFacsimile,
			setActiveId: this.props.setActiveId,
			setEntry: this.props.setEntry,
			setFacsimileHighlight: (x, y, w, h) => this.setState({ facsimileHighlight: [x, y, w, h] }),
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
								facsimileHighlight={this.state.facsimileHighlight}
								facsimiles={this.props.entry.facsimiles}
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
									doc={this.props.entry.doc}
								/>
					)
				}
			</PanelsWrapper>
		)
	}
}
