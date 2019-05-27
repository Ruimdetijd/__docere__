declare const config: DocereConfig

declare interface FormProps<T> {
	change: (handlerProps: Partial<T>) => void
	close: () => void
	handler: T
}

interface ContextState {
	activeId: string
	dataNodeTree: DataNode,
	extractors: Extractor[]
	input: string
	metadata: Metadata
	orientation: Orientation
}

interface ExtractedItem {
	count: number
	node: DataNode
	id: string
}

	
// interface Extractor {
// 	// color: string
// 	id: string
// 	// items?: ExtractedItem[]
// 	idAttribute?: string
// 	selector: string
// 	// title: string
// }
