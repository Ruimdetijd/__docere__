import * as React from 'react'
import { PanelsWrapper } from '../index.components'
// import { AsideTab } from '../../constants'
// import toPanel from './map-to-panel'
// import * as React from 'react'
import FacsimilePanel from './facsimile'
import TextPanel from './text'
import WitnessAnimationPanel from './witness-animation'
import XmlPanel from './xml'

// export default class Panels extends React.Component<PanelsProps, PanelsState> {
	// private setFacsimileArea: DocereComponentProps['setFacsimileArea'] = (facsimileAreas: FacsimileArea[]) => {
	// 	if (facsimileAreas.hasOwnProperty('x')) facsimileAreas = [facsimileAreas as any]
	// 	this.setState({ facsimileAreas })
	// }

	// state: PanelsState = {
		// customProps: {
		// 	activeFacsimilePath: this.props.activeFacsimilePath,
		// 	activeId: this.props.activeId,
		// 	activeListId: this.props.activeListId,
		// 	// attributes: {},
		// 	config: this.props.configData.config,
		// 	facsimiles: this.props.entry.facsimiles,
		// 	insideNote: false,
		// 	setActiveFacsimile: this.props.setActiveFacsimile,
		// 	setActiveId: this.props.setActiveId,
		// 	setEntry: this.props.setEntry,
		// 	setFacsimileArea: this.setFacsimileArea,
		// 	textLayer: null,
		// 	viewport: this.props.viewport,
		// },
		// facsimileAreas: [],
		// highlight: [],
	// }

	// shouldComponentUpdate(nextProps: PanelsProps) {
	// 	// Only update when the viewport has not changed
	// 	return this.props.viewport === nextProps.viewport ||
	// 		this.props.asideTab === AsideTab.TextData ||
	// 		nextProps.asideTab === AsideTab.TextData
	// }

	// componentDidUpdate() {
	// 	if (
	// 		this.state.customProps.activeFacsimilePath !== this.props.activeFacsimilePath ||
	// 		this.state.customProps.activeId !== this.props.activeId ||
	// 		this.state.customProps.activeListId !== this.props.activeListId ||
	// 		// facsimiles: this.props.entry.facsimiles,
	// 		this.state.customProps.viewport !== this.props.viewport
	// 	) {
	// 		this.setState({ customProps: {
	// 			...this.state.customProps,
	// 			activeFacsimilePath: this.props.activeFacsimilePath,
	// 			activeId: this.props.activeId,
	// 			activeListId: this.props.activeListId,
	// 			viewport: this.props.viewport,
	// 		}})
	// 	}

	// 	return this.state.customProps
	// }

function Panels(props: PanelsProps) {
	const activeLayers = props.layers.filter(ap => ap.active)

	return (
		<PanelsWrapper
			activeLayers={activeLayers}
		>
			{
				activeLayers.map(ap => {
					if (ap.type === LayerType.Facsimile) {
						return (
							<FacsimilePanel
								activeFacsimilePath={props.activeFacsimilePath}
								facsimileAreas={props.facsimileAreas}
								key={ap.id}
								projectId={props.configData.config.slug}
							/>
						)
					}

					if (ap.type === LayerType.Text) {
						return (
							<TextPanel
								activeFacsimilePath={props.activeFacsimilePath}
								activeId={props.activeId}
								activeListId={props.activeListId}
								configData={props.configData}
								dispatch={props.dispatch}
								entry={props.entry}
								key={ap.id}
								textLayerConfig={ap}
							/>
						)
					}

					if (ap.type === LayerType.WitnessAnimation) {
						return (
							<WitnessAnimationPanel
								activeFacsimilePath={props.activeFacsimilePath}
								activeId={props.activeId}
								activeListId={props.activeListId}
								configData={props.configData}
								dispatch={props.dispatch}
								entry={props.entry}
								key={ap.id}
								textLayerConfig={ap}
							/>
						)
					}

					if (ap.type === LayerType.XML) {
						return (
							<XmlPanel
								config={ap}
								key={ap.id}
								doc={props.entry.doc}
							/>
						)
					}
				})
			}
		</PanelsWrapper>
	)
}

export default React.memo(Panels)
