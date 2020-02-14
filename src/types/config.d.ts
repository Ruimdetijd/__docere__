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

interface FacsimileVersion {
	areas?: FacsimileArea[]
	path: string
}
interface ExtractedFacsimile {
	id: string
	versions: FacsimileVersion[]
}

interface DocereConfig {
	data?: Record<string, any>
	metadata?: MetadataConfig[]
	notes?: NotesConfig[]
	pages?: PageConfig[]
	searchResultCount?: number
	slug: string
	textData?: TextDataConfig[]
	textLayers?: LayerConfig[]
	title: string
}

interface DocereConfigFunctions {
	extractFacsimiles: (doc: XMLDocument, config: DocereConfig) => ExtractedFacsimile[]
	extractMetadata: (doc: XMLDocument, config: DocereConfig, id: string) => ExtractedMetadata
	extractNotes: (doc: XMLDocument) => Note[]
	extractTextData: (doc: XMLDocument, config: DocereConfig) => Entity[]
	extractTextLayers: (doc: XMLDocument, config: DocereConfig) => ExtractedTextLayer[]
	prepareDocument: (doc: XMLDocument, config: DocereConfig, id: string, textLayer?: Layer) => XMLDocument
}

type GetComponents = (container: DocereComponentContainer, id?: string) => Promise<DocereComponents>
type GetUIComponent = (componentType: UIComponentType, id?: string) => Promise<React.FC<any>>
type DocereConfigDataRaw = Partial<DocereConfigData>
	// getComponents?: (config: DocereConfig) => GetComponents
// }
interface DocereConfigData extends DocereConfigFunctions {
	// getComponents: GetComponents
	getComponents?: (config: DocereConfig) => GetComponents
	getUIComponent?: (config: DocereConfig) => GetUIComponent
	config: DocereConfig
}

type MetadataConfig = FacetConfig & {
	showInAside?: boolean /* Show data in the aside of the detail view? */
	showAsFacet?: boolean /* Show data as a facet? */

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

type TextDataConfig = MetadataConfig & {
	color?: string
	identifier?: TextDataIdentifier
	textLayers?: string[]
	type?: RsType
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
