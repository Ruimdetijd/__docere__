declare module 'openseadragon'

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

type DocereComponents = Record<string, (props: DocereComponentProps) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface AppState extends DocereConfigData {
	searchTab: SearchTab
	entryId: string
	pageId: string
	searchQuery: string
	setEntryId: (id?: string) => void
	setPage: (page?: PageConfig) => void
	setSearchTab: (tab: SearchTab) => void
	viewport: Viewport
}

type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: any
	config: DocereConfig
	facsimiles: ExtractedFacsimile[]
	insideNote: boolean
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setActiveId: SetActiveId
	setEntryId: AppState['setEntryId']
	textLayer: string
	viewport: Viewport
	[key: string]: any
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
