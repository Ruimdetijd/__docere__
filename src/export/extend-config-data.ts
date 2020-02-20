const defaultConfig: DocereConfig = {
	metadata: [],
	notes: [],
	pages: [],
	searchResultCount: 20,
	slug: 'unknown-project',
	title: 'Unknown project',
	entities: [],
	layers: []
}

const defaultFacsimileArea: Pick<FacsimileArea, 'showOnHover' | 'target' | 'unit'> = {
	showOnHover: true,
	target: null,
	unit: 'px'
}

export function extendFacsimile(facsimile: ExtractedFacsimile) {
	facsimile.versions = facsimile.versions.map(version => {
		if (!Array.isArray(version.areas)) {
			version.areas = []
			return version
		}

		version.areas = version.areas.map(area => ({ ...defaultFacsimileArea, ...area }))	

		return version
	})

	return facsimile
}

export const defaultMetadata: MetadataConfig = {
	datatype: EsDataType.Keyword,
	id: null,
	// TODO fixate the order number, which means: if there is no order than increment the order number: 999, 1000, 1001, 1002 (import for example the sort setting in the FS)
	order: 9999,
	showAsFacet: true,
	showInAside: true,
}

const defaultTextLayer: LayerConfig = {
	active: false,
	id: null,
	type: LayerType.Text
}
export function extendLayer(extractedTextLayer: ExtractedLayer, textLayersConfig: DocereConfig['layers']): Layer {
	const textLayerConfig = textLayersConfig.find(tlc => tlc.id === extractedTextLayer.id)
	if (textLayerConfig == null) return { title: extractedTextLayer.id, ...defaultTextLayer, ...extractedTextLayer }
	return { title: extractedTextLayer.id, ...textLayerConfig, ...extractedTextLayer }
}

const defaultDocereFunctions: DocereConfigFunctions = {
	prepareDocument: function prepareDocument(doc) { return doc },
	extractEntities: function extractEntities(_doc) { return [] },
	extractFacsimiles: function extractFacsimiles(_doc) { return [] },
	extractMetadata: function extractMetadata(_doc) { return {} },
	extractNotes: function extractNotes(_doc) { return [] },
	extractText: function extractText(doc) { return doc.documentElement.textContent },
	extractLayers: function extractTextLayers(_doc) { return [] }
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
	config.layers = config.layers.map(setTitle)

	config.metadata = config.metadata.map(md => {
		const metadataConfig = {...defaultMetadata, ...md} as MetadataConfig
		return setTitle(metadataConfig)
	})

	config.entities = config.entities.map(td => {
		const textDataConfig = {...defaultMetadata, ...td } as TextDataConfig
		if (!Array.isArray(td.textLayers)) {
			textDataConfig.textLayers = config.layers.map(tl => tl.id)
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
	// const { getComponents, ...configData } = configDataRaw

	// const getComponents: GetComponents = componentsGetter ? componentsGetter(config) : async () => ({})

	// const components = Object.keys(componentMap).reduce((prev, curr) => {
	// 	prev[curr] = React.memo(componentMap[curr])
	// 	return prev
	// }, {} as any)

	// TODO getComponents is added to docereConfigData, but should not
	return {
		getComponents: () => async () => ({}),
		getUIComponent: () => async () => null,
		...defaultDocereFunctions,
		...configDataRaw,
		config,
		// getComponents,
	}
}
