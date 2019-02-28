import * as React from 'react'
import Editor from '../../editor'

const defaultMetadataExtractorValue = `/**
function(xmlio, fileName) {
	const selector = ""
	let meta = xmlio
		.select(selector)
		.export(({ type: 'data', deep: false }))
	if (meta == null) return []
	if (!Array.isArray(meta)) meta = [meta]
	return meta.map(m => [m.attributes.type, m.attributes.value])
}
*/`

export default function MetadataExtractor(props: any) {
	if (props.project == null) return null

	const initValue = props.project.metadata_extractor == null ?
		defaultMetadataExtractorValue :
		props.project.metadata_extractor.toString()

	return (
		<section>
			<h3>Metadata Extractor</h3>
			<Editor
				change={value => {
					if (value === defaultMetadataExtractorValue) value = null
					props.change('metadata_extractor', value)
				}}
				initValue={initValue}
			/>
		</section>
	)
}
	// { this.state.metadata_extractor != null &&

// (metadata_extractor) =>
					// this.setState({ metadata_extractor })
