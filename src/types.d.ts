type Viewport = import('./constants').Viewport
type AsideTab = import('./constants').AsideTab
type SearchTab = import('./constants').SearchTab

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
type GetComponents = (config: DocereConfig) => DocereComponents

interface AppState extends DocereConfigData {
	searchTab: SearchTab
	entryId: string
	pageId: string
	searchQuery: string
	setAppState: (nextState: { [key in keyof AppState]?: any }, done?: () => void) => void
	setEntryId: (id?: string) => void
	setPage: (page?: PageConfig) => void
	viewport: Viewport
}

type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: any
	config: DocereConfig
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setActiveId: SetActiveId
	textLayer: string
	viewport: Viewport
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
