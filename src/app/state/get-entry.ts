import { extendTextLayer, extendFacsimile } from '../../export/extend-config-data'
import { fetchEntryXml } from '../../utils'

export default async function getEntry(id: string, configData: DocereConfigData): Promise<Entry> {
	let doc = await fetchEntryXml(configData.config.slug, id)
	doc = configData.prepareDocument(doc, configData.config, id)

	let textLayers = configData.extractTextLayers(doc, configData.config)
		// Extend the extracted text layers with their config
		.map(tl => extendTextLayer(tl, configData.config.textLayers))

	// The "other" layers are layers that are not found by extractTextLayers, but are defined in the config
	const otherLayers = configData.config.textLayers.filter(tl => textLayers.find(tl2 => tl.id === tl2.id) == null)

	// The "other" layers don't have an element, so they will use the whole XMLDocument
	textLayers = await Promise.all(
		otherLayers
			.map((ol: Layer) => { ol.element = doc; return ol })
			.concat(textLayers)
			.map(async (tl) => {
				const etl = extendTextLayer(tl, configData.config.textLayers)
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
	const notes = configData.extractNotes(doc)

	// TODO create null for empty arrays (facsimiles, entities)
	return {
		id,
		doc,
		facsimiles,
		metadata: configData.extractMetadata(doc, configData.config, id),
		notes: notes.length ? notes : null, // Empty array should be null to prevent rerenders
		entities: configData.extractTextData(doc, configData.config),
		// facsimileAreas: facsimileAreas.length ? facsimileAreas : null, // Empty array should be null to prevent rerenders
		textLayers
	}
}

// export default function useEntry(configData: DocereConfigData) {
// 	const [entryId, setEntryId] = React.useState<string>(null)
// 	const [entry, setEntry] = React.useState<Entry>(null)

// 	React.useEffect(() => {
// 		getEntry(entryId, configData).then(entry => setEntry(entry))
// 	}, [configData, entryId])

// 	return [entry, setEntryId]
// }
