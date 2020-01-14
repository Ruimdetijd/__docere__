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
type ExtractedTextLayer = Pick<TextLayer, 'element'> & Pick<TextLayerConfig, 'id'> & Partial<TextLayerConfig>

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
	textLayers?: TextLayerConfig[]
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
	prepareDocument: (doc: XMLDocument, config: DocereConfig, id: string, textLayer?: TextLayer) => XMLDocument
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

interface TextLayerConfig extends EntityConfig {
	active: boolean
	type: TextLayerType
	xmlPath?: (id: string) => string
}

interface TextLayer extends TextLayerConfig {
	element: Element | XMLDocument
}

interface NotesConfig extends EntityConfig {

}
