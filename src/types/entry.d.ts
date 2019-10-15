interface TextDataValue {
	count: number
	key: string
	value: string
}
interface ExtractedNote {
	n: string | number
	el: Element
}

type ExtractedNotes = Record<string, ExtractedNote[]>
type ExtractedMetadata = Record<string, boolean | string | string[]>
type ExtractedTextData = Record<string, TextDataValue[]>
type ExtractedTextLayers = Record<string, Element>

interface ExtractedFacsimile {
	id: string
	path: string[]
}

interface Entry {
	id: string
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	textData: ExtractedTextData
	textLayers: ExtractedTextLayers
}
