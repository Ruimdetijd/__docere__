declare const config: DocereConfig

declare interface FormProps<T> {
	change: (handlerProps: Partial<T>) => void
	close: () => void
	handler: T
}

interface AppState {
	id: string
	getPrevNext: (id: string) => [Hit, Hit]
	project: string
	searchQuery: string
	setAppState: (key: keyof AppState, value: any) => void
	setId: (id?: string) => void
	viewport: import('./index').Viewport
}

// interface ContextState {
// 	activeId: string
// 	dataNodeTree: DataNode,
// 	extractors: Extractor[]
// 	input: string
// 	metadata: Metadata
// 	orientation: Orientation
// }

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
