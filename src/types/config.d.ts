/// <reference types="huc-faceted-search" />

interface TextData {
	count?: number
	id: string
	type: string
}

interface Entity extends TextData {
	value: string
}

interface Note extends TextData {
	el: Element
	targetId: string | number
}

// type NotesByType = Record<string, Note[]>

type ExtractedMetadata = Record<string, number | boolean | string | string[]>
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

interface DocereConfigFunctions {
	extractFacsimiles: (doc: XMLDocument) => ExtractedFacsimile[]
	extractFacsimileAreas: (doc: XMLDocument, config: DocereConfig) => FacsimileArea[]
	extractMetadata: (doc: XMLDocument, config: DocereConfig, id: string) => ExtractedMetadata
	extractNotes: (doc: XMLDocument) => Note[]
	extractTextData: (doc: XMLDocument, config: DocereConfig) => Entity[]
	extractTextLayers: (doc: XMLDocument, config: DocereConfig) => ExtractedTextLayer[]
	prepareDocument: (doc: XMLDocument, config: DocereConfig, id: string, textLayer?: Layer) => XMLDocument
}

interface DocereConfigData extends DocereConfigFunctions {
	components: DocereComponents
	config: DocereConfig
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
