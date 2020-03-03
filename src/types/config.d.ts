// Data extracted from the text: entities, notes, ...
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

type Metadata = Record<string, number | boolean | string | string[]>
type ExtractedLayer = Pick<Layer, 'id'> & Partial<Layer>

interface FacsimileVersion {
	areas?: FacsimileArea[]
	path: string
}
interface Facsimile {
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
	entities?: EntityConfig[]
	layers?: LayerConfig[]
	title: string
}

interface DocereConfigFunctions {
	extractFacsimiles: (doc: XMLDocument, config: DocereConfig) => Facsimile[]
	extractMetadata: (doc: XMLDocument, config: DocereConfig, id: string) => Metadata
	extractNotes: (doc: XMLDocument, config: DocereConfig) => Note[]
	extractText: (doc: XMLDocument, config: DocereConfig) => string
	extractEntities: (doc: XMLDocument, config: DocereConfig) => Entity[]
	extractLayers: (doc: XMLDocument, config: DocereConfig) => ExtractedLayer[]
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

interface EntityAttributeIdentifier {
	type: TextDataExtractionType.Attribute
	attribute: string
}

interface EntityMilestoneIdentifier {
	type: TextDataExtractionType.Milestone
	idAttribute: string // <start id="some-id" />
	refAttribute: string // <end ref="some-id" />
}

interface EntityContentIdentifier {
	type: TextDataExtractionType.TextContent
}

type EntityIdentifier = EntityAttributeIdentifier | EntityMilestoneIdentifier | EntityContentIdentifier

type EntityConfig = MetadataConfig & {
	color?: string
	identifier?: EntityIdentifier
	textLayers?: string[]
	type?: RsType
}

interface BaseConfig {
	id: string
	title?: string
}

interface PageConfig extends BaseConfig {
	path?: string
	children?: PageConfig[]
}

interface LayerConfig extends BaseConfig {
	active?: boolean
	type?: LayerType
}

interface TextLayerConfig extends LayerConfig {
	asideActive?: boolean
	type: LayerType.Text
}

interface TextLayer extends TextLayerConfig {
	element: Element | XMLDocument
}

interface XmlLayer extends LayerConfig {
	element: Element | XMLDocument
	type: LayerType.XML
}

type Layer = TextLayer | XmlLayer | LayerConfig

// interface TextLayer extends Layer {
// 	expand: boolean
// }

interface NotesConfig extends BaseConfig {

}
