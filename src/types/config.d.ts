interface DocereConfig {
	metadata?: MetaDataConfig[]
	notes?: NotesConfig[]
	pages?: PageConfig[]
	searchResultCount?: number
	slug: string
	textdata?: TextDataConfig[]
	textlayers?: TextLayerConfig[]
	title: string
}

interface DocereConfigDataRaw {
	getComponents?: (config: DocereConfig) => DocereComponents
	config?: DocereConfig
	extractFacsimiles?: (doc: XMLDocument) => ExtractedFacsimile[]
	extractMetadata?: (doc: XMLDocument) => ExtractedMetadata
	extractNotes?: (doc: XMLDocument) => ExtractedNotes
	extractTextData?: (doc: XMLDocument, config: DocereConfig) => ExtractedTextData
	extractTextLayers?: (doc: XMLDocument, config: DocereConfig) => ExtractedTextLayers
	prepareDocument?: (doc: XMLDocument, config: DocereConfig, id?: string) => XMLDocument
}

interface DocereConfigData {
	components: DocereComponents
	config: DocereConfig
	extractFacsimiles: DocereConfigDataRaw['extractFacsimiles']
	extractMetadata: DocereConfigDataRaw['extractMetadata']
	extractNotes: DocereConfigDataRaw['extractNotes']
	extractTextData: DocereConfigDataRaw['extractTextData']
	extractTextLayers: DocereConfigDataRaw['extractTextLayers']
	prepareDocument: DocereConfigDataRaw['prepareDocument']
}

interface MetaDataConfig extends EntityConfig {
	aside?: boolean
	datatype?: EsDataType
	order?: number
	size?: number
}

interface TextDataExtractor {
	selector: string
	extractionType: TextDataExtractionType
	idAttribute?: string
}

interface TextDataConfig extends MetaDataConfig {
	color: string
	extractor: TextDataExtractor
	textLayers?: string[]
}

interface EntityConfig {
	id: string
	title?: string
}

interface PageConfig extends EntityConfig {
	path?: string
	children?: PageConfig[]
}

interface TextLayerConfig extends EntityConfig {
	active: boolean
	type: TextLayerType
	selector?: string
}

interface NotesConfig extends EntityConfig {

}
