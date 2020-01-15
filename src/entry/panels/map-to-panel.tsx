import * as React from 'react'
import FacsimilePanel from './facsimile'
import TextPanel from './text'
import WitnessAnimationPanel from './witness-animation'
import XmlPanel from './xml'

export default function mapToPanel(ap: TextLayerConfig, props: PanelsProps, state: PanelsState) {

	if (ap.type === TextLayerType.Facsimile) {
		return (
			<FacsimilePanel
				activeFacsimilePath={props.activeFacsimilePath}
				facsimileAreas={state.facsimileAreas}
				facsimiles={props.entry.facsimiles}
				key={ap.id}
				projectId={props.configData.config.slug}
			/>
		)
	}

	if (ap.type === TextLayerType.TextLayer) {
		return (
			<TextPanel
				configData={props.configData}
				customProps={state.customProps}
				entry={props.entry}
				hasScroll={props.hasScroll}
				highlight={state.highlight}
				key={ap.id}
				searchQuery={props.searchQuery}
				textLayerConfig={ap}
			/>
		)
	}

	if (ap.type === TextLayerType.WitnessAnimation) {
		return (
			<WitnessAnimationPanel
				configData={props.configData}
				entry={props.entry}
				hasScroll={props.hasScroll}
				key={ap.id}
				setActiveFacsimile={props.setActiveFacsimile}
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
