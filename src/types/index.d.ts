/// <reference path="./enum.d.ts" />
/// <reference path="./config.d.ts" />
/// <reference path="./components.d.ts" />

declare module 'openseadragon'

// declare interface FormProps<T> {
// 	change: (handlerProps: Partial<T>) => void
// 	close: () => void
// 	handler: T
// }

interface AppState {
	configData: DocereConfigData
	entryId: string
	getEntryDoc: () => Promise<XMLDocument>
	pageId: string
	searchQuery: string
	searchTab: SearchTab
	setEntryId: (id?: string) => void
	setPage: (page?: PageConfig) => void
	setSearchTab: (tab: SearchTab) => void
	viewport: Viewport
}

type FileExplorerProps = Pick<DocereConfigData, 'config'> & Pick<AppState, 'entryId' | 'searchTab' | 'setEntryId' | 'viewport'>

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
