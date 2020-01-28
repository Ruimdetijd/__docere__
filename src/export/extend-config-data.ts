import * as React from 'react'

const defaultConfig: DocereConfig = {
	metadata: [],
	notes: [],
	pages: [],
	searchResultCount: 20,
	slug: 'unknown-project',
	title: 'Unknown project',
	textData: [],
	textLayers: [
		// {
		// 	active: true,
		// 	id: 'facsimile',
		// 	title: 'Facsimile',
		// 	type: TextLayerType.Facsimile
		// },
		// {
		// 	active: true,
		// 	id: 'transcription',
		// 	title: 'Transcription',
		// 	type: TextLayerType.TextLayer
		// },
		// {
		// 	active: false,
		// 	id: 'tei',
		// 	title: 'TEI',
		// 	type: TextLayerType.XML
		// }
	]
}

export const defaultFacsimileArea: Pick<FacsimileArea, 'showOnHover' | 'target' | 'unit'> = {
	showOnHover: true,
	target: null,
	unit: 'px'
}

export const defaultMetadata: MetadataConfig = {
	aside: true,
	datatype: EsDataType.Keyword,
	id: null,
	// TODO fixate the order number, which means: if there is no order than increment the order number: 999, 1000, 1001, 1002 (import for example the sort setting in the FS)
	order: 9999,
}

const defaultTextLayer: LayerConfig = {
	active: false,
	id: null,
	type: LayerType.Text
}
export function extendTextLayer(extractedTextLayer: ExtractedTextLayer, textLayersConfig: DocereConfig['textLayers']): Layer {
	const textLayerConfig = textLayersConfig.find(tlc => tlc.id === extractedTextLayer.id)
	if (textLayerConfig == null) return { title: extractedTextLayer.id, ...defaultTextLayer, ...extractedTextLayer }
	return { title: extractedTextLayer.id, ...textLayerConfig, ...extractedTextLayer }
}

const defaultDocereFunctions: DocereConfigFunctions = {
	prepareDocument: function prepareDocument(doc) { return doc },
	extractFacsimiles: function extractFacsimiles(_doc) { return [] },
	extractFacsimileAreas: function extractFacsimileAreas(_doc, _config) { return [] },
	extractMetadata: function extractMetadata(_doc) { return {} },
	extractNotes: function extractNotes(_doc) { return [] },
	extractTextData: function extractTextData(_doc) { return [] },
	extractTextLayers: function extractTextLayers(_doc) { return [] }
}

function setTitle<T extends FacetConfig>(entityConfig: T): T {
	if (entityConfig.title == null) {
		entityConfig.title = entityConfig.id.charAt(0).toUpperCase() + entityConfig.id.slice(1)
	}
	return entityConfig
}

function setPath(page: PageConfig) {
	if (page.path == null) page.path = `${page.id}.xml`
	return page
}

export default function extendConfigData(configDataRaw: DocereConfigDataRaw): DocereConfigData {
	const config = {...defaultConfig, ...configDataRaw.config}
	config.textLayers = config.textLayers.map(setTitle)

	config.metadata = config.metadata.map(md => {
		const metadataConfig = {...defaultMetadata, ...md} as MetadataConfig
		return setTitle(metadataConfig)
	})
	config.textData = config.textData.map(td => {
		const textDataConfig = {...defaultMetadata, ...td } as TextDataConfig
		if (!Array.isArray(td.textLayers)) {
			textDataConfig.textLayers = config.textLayers.map(tl => tl.id)
		}
		return setTitle(textDataConfig)
	})

	config.notes = config.notes.map(setTitle)
	config.pages = config.pages.map(page => {
		if (Array.isArray(page.children)) {
			page.children = page.children.map(p => setTitle(setPath(p)))
		}
		return setTitle(setPath(page))
	})

	// Separate getComponents from raw configData, because we don't want to include it in de final map
	// getComponents is only used to generate a map of components
	const { getComponents, ...configData } = configDataRaw

	const componentMap = getComponents ? getComponents(config) : {}
	const components = Object.keys(componentMap).reduce((prev, curr) => {
		prev[curr] = React.memo(componentMap[curr])
		return prev
	}, {} as any)

	// TODO getComponents is added to docereCOnfigData, but should not
	return {
		...defaultDocereFunctions,
		...configData,
		config,
		components,
	}
}
