import { extendLayer, extendFacsimile } from '../../export/extend-config-data'
import { fetchEntryXml } from '../../utils'

export default async function getEntry(id: string, configData: DocereConfigData): Promise<Entry> {
	let doc = await fetchEntryXml(configData.config.slug, id)
	doc = configData.prepareDocument(doc, configData.config, id)

	let textLayers = configData.extractLayers(doc, configData.config)
		// Extend the extracted text layers with their config
		.map(tl => extendLayer(tl, configData.config.layers))

	// The "other" layers are layers that are not found by extractTextLayers, but are defined in the config
	const otherLayers = configData.config.layers.filter(tl => textLayers.find(tl2 => tl.id === tl2.id) == null)

	// The "other" layers don't have an element, so they will use the whole XMLDocument
	textLayers = await Promise.all(
		otherLayers
			.map((ol: Layer) => { ol.element = doc; return ol })
			.concat(textLayers)
			.map(async (tl) => {
				const etl = extendLayer(tl, configData.config.layers)
				if (etl.hasOwnProperty('xmlPath')) {
					const doc = await fetchEntryXml(configData.config.slug, etl.xmlPath(id))
					if (doc != null) {
						etl.element = configData.prepareDocument(doc, configData.config, id, etl)
					}
				}
				return etl
			})
	)

	const facsimiles = configData.extractFacsimiles(doc, configData.config).map(extendFacsimile)
	const notes = configData.extractNotes(doc, configData.config)

	// TODO create null for empty arrays (facsimiles, entities)
	return {
		id,
		doc,
		facsimiles,
		metadata: configData.extractMetadata(doc, configData.config, id),
		notes: notes.length ? notes : null, // Empty array should be null to prevent rerenders
		entities: configData.extractEntities(doc, configData.config),
		layers: textLayers
	}
}
