/// <reference types="huc-faceted-search" />

interface TextDataValue {
	count: number
	value: string
}
interface ExtractedNote {
	n: string | number
	el: Element
}

type ExtractedNotes = Record<string, ExtractedNote[]>
type ExtractedMetadata = Record<string, number | boolean | string | string[]>
type ExtractedTextData = Map<string, Map<string, TextDataValue>>
type ExtractedTextLayer = Pick<Layer, 'element'> & Pick<LayerConfig, 'id'> & Partial<LayerConfig>

interface ExtractedFacsimile {
	id: string
	path: string[]
}

interface DocereConfig {
	data?: Record<string, any>
	metadata?: MetaDataConfig[]
	notes?: NotesConfig[]
	pages?: PageConfig[]
	searchResultCount?: number
	slug: string
	textData?: TextDataConfig[]
	textLayers?: LayerConfig[]
	title: string
}

type DocereConfigDataRaw = Partial<Omit<DocereConfigData, 'components'>> &
	{ getComponents?: (config: DocereConfig) => DocereComponents }

interface DocereConfigData {
	components: DocereComponents
	config: DocereConfig
	extractFacsimiles: (doc: XMLDocument) => ExtractedFacsimile[]
	extractMetadata: (doc: XMLDocument, config: DocereConfig, id: string) => ExtractedMetadata
	extractNotes: (doc: XMLDocument) => ExtractedNotes
	extractTextData: (doc: XMLDocument, config: DocereConfig) => ExtractedTextData
	extractTextLayers: (doc: XMLDocument, config: DocereConfig) => ExtractedTextLayer[]
	prepareDocument: (doc: XMLDocument, config: DocereConfig, id: string, textLayer?: Layer) => XMLDocument
}

interface MetaDataConfig extends EntityConfig {
	aside?: boolean
	datatype?: EsDataType
	order?: number
	size?: number
}

interface TextDataAttributeIdentifier {
	type: TextDataExtractionType.Attribute
	attribute: string
}

interface TextDataMilestoneIdentifier {
	type: TextDataExtractionType.Milestone
	idAttribute: string // <start id="some-id" />
	refAttribute: string // <end ref="some-id" />
}

interface TextDataTextContentIdentifier {
	type: TextDataExtractionType.TextContent
}

type TextDataIdentifier = TextDataAttributeIdentifier | TextDataMilestoneIdentifier | TextDataTextContentIdentifier

interface TextDataConfig extends MetaDataConfig {
	color?: string
	identifier: TextDataIdentifier
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

interface LayerConfig extends EntityConfig {
	active: boolean
	type: LayerType
	xmlPath?: (id: string) => string
}

interface Layer extends LayerConfig {
	element: Element | XMLDocument
}

interface NotesConfig extends EntityConfig {

}
