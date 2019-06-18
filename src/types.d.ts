declare const enum Orientation {
	Horizontal,
	Vertical
}

declare interface FormProps<T> {
	change: (handlerProps: Partial<T>) => void
	close: () => void
	handler: T
}

// TODO type props
type DocereComponents = Record<string, (props: any) => JSX.Element>
interface FunctionTypes {
	getComponents: (config: DocereConfig) => DocereComponents
}

interface AppState extends DocereConfigData {
	entryId: string
	pageId: string
	searchQuery: string
	setAppState: (key: keyof AppState, value: any) => void
	setEntryId: (id?: string) => void
	setPage: (page?: Page) => void
	viewport: import('./constants').Viewport
}


interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: any
	config: DocereConfig
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setActiveId: (activeListId: string, activeId: string) => void
	viewport: AppState['viewport']
}
// interface ContextState {
// 	activeId: string
// 	dataNodeTree: DataNode,
// 	extractors: Extractor[]
// 	input: string
// 	metadata: Metadata
// 	orientation: Orientation
// }

// interface ExtractedItem {
// 	count: number
// 	node: DataNode
// 	id: string
// }

	
// interface Extractor {
// 	// color: string
// 	id: string
// 	// items?: ExtractedItem[]
// 	idAttribute?: string
// 	selector: string
// 	// title: string
// }
