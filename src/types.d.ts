declare interface FormProps<T> {
	change: (handlerProps: Partial<T>) => void
	close: () => void
	handler: T
}

interface ExtractedItem {
	count: number
	node: DataNode
	id: string
}

// type Extracted = {
// 	items: ExtractedItem[]
// 	id: string
// }
type Metadata = [string, string][]
	
interface ContextState {
	activeId: string
	dataNodeTree: DataNode,
	// extracted: Extracted
	extractors: Extractor[]
	input: string
	metadata: Metadata
	// xmlio: import('xmlio').default
}

interface Extractor {
	color: string
	id: string
	items?: ExtractedItem[]
	idAttribute?: string
	selector: string
	title: string
}