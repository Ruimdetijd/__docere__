import { extendLayer, extendFacsimile } from '../../export/extend-config-data'
import { fetchEntryXml, isTextLayer, isXmlLayer } from '../../utils'

async function extractLayers(doc: XMLDocument, configData: DocereConfigData) {
	// Extract layers with the layers extraction function
	const layers = configData.extractLayers(doc, configData.config)
	const extractedLayerIds = layers.map(l => l.id)

	return configData.config.layers
		// Keep the layers that are not found by the extraction function, but are defined in the config
		.filter(tl => extractedLayerIds.indexOf(tl.id) === -1)
		// Add the whole document as `element` (extracted layers already have the `element` prop defined)
		.map((ol: Layer) => {
			if (isTextLayer(ol) || isXmlLayer(ol)) ol.element = doc
			return ol
		})
		// Concat the extracted layers with the layers not found by extract layers, but defined in the config
		.concat(layers)
		// Extend all layers with the defaults
		.map(tl => extendLayer(tl, configData.config.layers))
}

export default async function getEntry(id: string, configData: DocereConfigData): Promise<Entry> {
	// Fetch and prepare XML document
	let doc = await fetchEntryXml(configData.config.slug, id)
	doc = configData.prepareDocument(doc, configData.config, id)

	// Extract data
	const entities = configData.extractEntities(doc, configData.config)
	const facsimiles = configData.extractFacsimiles(doc, configData.config).map(extendFacsimile)
	const layers = await extractLayers(doc, configData)
	const notes = configData.extractNotes(doc, configData.config)

	return {
		doc,
		entities: entities.length ? entities : null,
		facsimiles: facsimiles.length ? facsimiles : null,
		id,
		layers,
		metadata: configData.extractMetadata(doc, configData.config, id),
		notes: notes.length ? notes : null, // Empty array should be null to prevent rerenders
	}
}

		// Extend the extracted text layers with their config
		// .map(tl => extendLayer(tl, configData.config.layers))

	// The "other" layers are layers that are not found by extractTextLayers, but are defined in the config

				// const etl = extendLayer(tl, configData.config.layers)
				// if (etl.hasOwnProperty('xmlPath')) {
				// 	const doc = await fetchEntryXml(configData.config.slug, etl.xmlPath(id))
				// 	if (doc != null) {
				// 		etl.element = configData.prepareDocument(doc, configData.config, id, etl)
				// 	}
				// }
				// return etl
			// })
	// )
