import * as React from 'react'
import { PanelsWrapper } from '../index.components'
import { AsideTab } from '../../constants'
import toPanel from './map-to-panel'

export default class Panels extends React.Component<PanelsProps, PanelsState> {
	private setFacsimileArea: DocereComponentProps['setFacsimileArea'] = (facsimileAreas: FacsimileArea[]) => {
		if (facsimileAreas.hasOwnProperty('x')) facsimileAreas = [facsimileAreas as any]
		this.setState({ facsimileAreas })
	}

	state: PanelsState = {
		customProps: {
			activeFacsimilePath: this.props.activeFacsimilePath,
			activeId: this.props.activeId,
			activeListId: this.props.activeListId,
			attributes: {},
			config: this.props.configData.config,
			facsimiles: this.props.entry.facsimiles,
			insideNote: false,
			setActiveFacsimile: this.props.setActiveFacsimile,
			setActiveId: this.props.setActiveId,
			setEntry: this.props.setEntry,
			setFacsimileArea: this.setFacsimileArea,
			textLayer: null,
			viewport: this.props.viewport,
		},
		facsimileAreas: [],
		highlight: [],
	}

	shouldComponentUpdate(nextProps: PanelsProps) {
		// Only update when the viewport has not changed
		return this.props.viewport === nextProps.viewport ||
			this.props.asideTab === AsideTab.TextData ||
			nextProps.asideTab === AsideTab.TextData
	}

	componentDidUpdate() {
		if (
			this.state.customProps.activeFacsimilePath !== this.props.activeFacsimilePath ||
			this.state.customProps.activeId !== this.props.activeId ||
			this.state.customProps.activeListId !== this.props.activeListId ||
			// facsimiles: this.props.entry.facsimiles,
			this.state.customProps.viewport !== this.props.viewport
		) {
			this.setState({ customProps: {
				...this.state.customProps,
				activeFacsimilePath: this.props.activeFacsimilePath,
				activeId: this.props.activeId,
				activeListId: this.props.activeListId,
				viewport: this.props.viewport,
			}})
		}

		return this.state.customProps
	}

	render() {
		const activePanels = this.props.activePanels.filter(ap => ap.active)

		return (
			<PanelsWrapper
				activePanels={activePanels}
				orientation={this.props.orientation}
			>
				{
					activePanels.map(ap => toPanel(ap, this.props, this.state))
				}
			</PanelsWrapper>
		)
	}
}
