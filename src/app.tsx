import * as React from 'react'
import Entry from './entry'
import PageView from './page'
import { SearchTab, Viewport } from './constants'
import EntrySelector from './entry-selector';
import Header from './header'

// TODO move to types.d.ts
type AppProps = Pick<AppState, 'configData' | 'entryId' | 'pageId' | 'viewport'> & { EntrySelector: typeof EntrySelector }

export default abstract class App extends React.PureComponent<AppProps, AppState> {
	// Remember the last entry. When user closes a Page, we can return
	// to the last viewed entry
	// TODO use history api?
	private lastEntryId: string

	// TODO why add methods and props to state?
	state: AppState = {
		...this.props,
		getEntryDoc: () => this.getEntryDoc(),
		searchQuery: null,
		searchTab: null,
		setEntryId: (entryId: string) => this.setEntryId(entryId),
		setPage: (page: PageConfig) => this.setPage(page),
		setSearchTab: (tab: SearchTab) => this.setSearchTab(tab)
	}

	protected abstract async getEntryDoc(): Promise<XMLDocument>

	render() {
		const { configData, entryId, getEntryDoc, pageId, searchQuery, searchTab, setEntryId, setPage, setSearchTab, viewport } = this.state
		return (
			<>
				<Header
					config={configData.config}
					setPage={setPage}
					setEntryId={setEntryId}
				/>
				<PageView
					config={configData.config}
					entryId={entryId}
					pageId={pageId}
					setPage={setPage}
				/>
				<this.props.EntrySelector
					config={configData.config}
					entryId={entryId}
					searchTab={searchTab}
					setEntryId={setEntryId}
					setSearchTab={setSearchTab}
					viewport={viewport}
				/>
				<Entry 
					configData={configData}
					entryId={entryId}
					getEntryDoc={getEntryDoc}
					viewport={viewport}
					searchTab={searchTab}
					searchQuery={searchQuery}
					setEntryId={setEntryId}
				/>
			</>
		)
	}

	private setSearchTab(searchTab: SearchTab) {
		if (searchTab === SearchTab.Results && this.state.searchTab === SearchTab.Results) this.setState({ searchTab: null })
		else if (searchTab === SearchTab.Results) this.setState({ searchTab })
		else if (searchTab === SearchTab.Search) this.setEntryId()
	}

	protected setEntryId(entryId?: string, push = true) {
		this.lastEntryId = entryId

		const nextState: Partial<AppState> = {
			entryId,
			pageId: null,
			viewport: Viewport.Entry,
		}

		if (entryId == null) {
			nextState.viewport = Viewport.Search
			nextState.searchTab = null
		}

		this.setState(nextState as any, () => {
			this.afterSetEntryId(entryId, push)
		})
	}

	protected setPage(page: PageConfig, push = true) {
		if (page == null) {
			this.setEntryId(this.lastEntryId)
			return
		}

		this.setState({ entryId: 'pages', pageId: page.id }, () => {
			this.afterSetPage(page, push)
		})
	}

	protected afterSetEntryId(_entryId: string, _push: boolean) {}
	protected afterSetPage(_page: PageConfig, _push: boolean) {}
}
