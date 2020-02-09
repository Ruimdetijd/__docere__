/// <reference path="./enum.d.ts" />
/// <reference path="./entry.d.ts" />
/// <reference path="./config.d.ts" />
/// <reference path="./components.d.ts" />
/// <reference path="./panels.d.ts" />
/// <reference path="../entry/state/index.d.ts" />
/// <reference path="../app/state/index.d.ts" />


declare module 'openseadragon'

type Page = PageConfig & { doc: XMLDocument }

interface AppState {
	entry: Entry
	entryId: string
	page: Page
	pageId: string
	searchQuery: string
	searchTab: SearchTab
	viewport: Viewport
}

type FileExplorerProps = Pick<AppState, 'entry' | 'searchTab' | 'viewport'> & {
	appDispatch: React.Dispatch<AppStateAction>
}
