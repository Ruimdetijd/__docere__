/// <reference path="./enum.d.ts" />
/// <reference path="./entry.d.ts" />
/// <reference path="./config.d.ts" />
/// <reference path="./components.d.ts" />
/// <reference path="./panels.d.ts" />
/// <reference path="../entry/reducers/entry-state.d.ts" />

declare module 'openseadragon'

type Page = PageConfig & { doc: XMLDocument }

interface AppState {
	configData: DocereConfigData
	entry: Entry
	page: Page
	searchQuery: string
	searchTab: SearchTab
	setEntry: (id?: string) => void
	setPage: (id?: string) => void
	setSearchTab: (tab: SearchTab) => void
	viewport: Viewport
}

type FileExplorerProps = Pick<DocereConfigData, 'config'> & Pick<AppState, 'entry' | 'searchTab' | 'setEntry' | 'viewport'>
