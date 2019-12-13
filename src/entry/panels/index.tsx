import * as React from 'react'
import { EntryState, EntryProps } from '../index'

import { PanelsWrapper } from '../index.components'
import { AsideTab } from '../../constants'
import toPanel from './map-to-panel'

export type PanelsProps = EntryProps & EntryState & {
	setActiveId: SetActiveId
	setActiveFacsimile: (path: string) => void
}
export interface PanelsState {
	facsimileHighlight: FacsimileHighlightOptions
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
			setFacsimileHighlight: this.setFacsimileHighlight,
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
					activePanels.map(ap => toPanel(ap, this.props, this.state, customProps))
				}
			</PanelsWrapper>
		)
	}

	private setFacsimileHighlight = (opts: FacsimileHighlightOptions) => this.setState({ facsimileHighlight: opts })
}
