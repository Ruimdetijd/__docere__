import extractTextData from './textdata'
import * as React from 'react'

const defaultConfig: DocereConfig = {
	metadata: [],
	notes: [],
	pages: [],
	searchResultCount: 20,
	slug: 'unknown-project',
	title: 'Unknown project',
	textData: [],
	// textLayers: []
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

export const defaultMetadata: MetaDataConfig = {
	aside: true,
	datatype: EsDataType.keyword,
	id: null,
	order: 9999,
}

const defaultTextLayer: TextLayerConfig = {
	active: false,
	id: null,
	type: TextLayerType.TextLayer
}
export function extendTextLayer(extractedTextLayer: ExtractedTextLayer, textLayersConfig: DocereConfig['textLayers']): TextLayer {
	const textLayerConfig = textLayersConfig.find(tlc => tlc.id === extractedTextLayer.id)
	if (textLayerConfig == null) return { title: extractedTextLayer.id, ...defaultTextLayer, ...extractedTextLayer }
	return { title: extractedTextLayer.id, ...textLayerConfig, ...extractedTextLayer }
}

const defaultDocereFunctions: Pick<DocereConfigData, 'prepareDocument' | 'extractFacsimiles' | 'extractMetadata' | 'extractNotes' | 'extractTextData' | 'extractTextLayers'> = {
	prepareDocument: function prepareDocument(doc) { return doc },
	extractFacsimiles: function extractFacsimiles(_doc) { return [] },
	extractMetadata: function extractMetadata(_doc) { return {} },
	extractNotes: function extractNotes(_doc) { return {} },
	extractTextData,
	extractTextLayers: function extractTextLayers(_doc) { return [] }
}

function setTitle<T extends EntityConfig>(entityConfig: T): T {
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

	config.metadata = config.metadata.map(md => setTitle({...defaultMetadata, ...md}))
	config.textData = config.textData.map(td => {
		td = {...defaultMetadata, ...td }
		if (!Array.isArray(td.textLayers)) {
			td.textLayers = config.textLayers.map(tl => tl.id)
		}
		return setTitle(td)
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
		prev[curr] = React.memo(components[curr])
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
