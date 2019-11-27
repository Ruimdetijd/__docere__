import * as React from 'react'
import FacsimilePanel from './facsimile'
import TextPanel from './text'
import WitnessAnimationPanel from './witness-animation'
import XmlPanel from './xml'
import { PanelsProps, PanelsState } from './index'

export default function mapToPanel(ap: TextLayerConfig, props: PanelsProps, state: PanelsState, customProps: DocereComponentProps) {

	if (ap.type === TextLayerType.Facsimile) {
		return (
			<FacsimilePanel
				activeFacsimilePath={props.activeFacsimilePath}
				facsimileHighlight={state.facsimileHighlight}
				facsimiles={props.entry.facsimiles}
				key={ap.id}
				orientation={props.orientation}
				projectId={props.configData.config.slug}
			/>
		)
	}

	if (ap.type === TextLayerType.TextLayer) {
		return (
			<TextPanel
				{...props}
				{...state}
				customProps={customProps}
				key={ap.id}
				textLayerConfig={ap}
			/>
		)
	}

	if (ap.type === TextLayerType.WitnessAnimation) {
		return (
			<WitnessAnimationPanel
				{...props}
				{...state}
				customProps={customProps}
				key={ap.id}
				textLayerConfig={ap}
			/>
		)
	}

	if (ap.type === TextLayerType.XML) {
		return (
			<XmlPanel
				config={ap}
				key={ap.id}
				doc={props.entry.doc}
			/>
		)
	}
}
