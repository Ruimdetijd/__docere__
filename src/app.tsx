import * as React from 'react'
import EntryComp from './entry'
import PageView from './page'
import { SearchTab, Viewport } from './constants'
import EntrySelector from './entry-selector'
import Header from './header'

// TODO move to types.d.ts, but first replace EntrySelector
type AppProps = Pick<AppState, 'configData'> & { entryId: string, EntrySelector: typeof EntrySelector, pageId: string }

export default abstract class App extends React.PureComponent<AppProps, AppState> {
	// Remember the last entry. When user closes a Page, we can return
	// to the last viewed entry
	// TODO use history api?
	private lastEntryId: string

	// TODO why add methods and props to state?
	state: AppState = {
		...this.props,
		entry: null,
		page: null,
		searchQuery: null,
		searchTab: null,
		setEntry: (id: string) => this.setEntry(id),
		setPage: (id: string) => this.setPage(id),
		setSearchTab: (tab: SearchTab) => this.setSearchTab(tab),
		viewport: Viewport.Search
	}

	protected abstract async getEntryDoc(entryId: string): Promise<XMLDocument>
	protected abstract async getPageDoc(pageConfig: PageConfig): Promise<XMLDocument>

	async componentDidMount() {
		let title = this.props.configData.config.title

		const nextState: Pick<AppState, 'entry' | 'page' | 'viewport'> = {
			entry: null,
			page: null,
			viewport: Viewport.Search,
		}

		if (this.props.pageId != null) {
			nextState.viewport = Viewport.Page
			nextState.page = await this.getPage(this.props.pageId)
			document.title = `${title} - ${nextState.page.title}`
		}
		else if (this.props.entryId != null) {
			nextState.viewport = Viewport.Entry
			nextState.entry = await this.getEntry(this.props.entryId)
			document.title = `${title} - ${nextState.entry.id}`
		}

		this.setState(nextState, () => this.afterComponentDidMount())
	}

	render() {
		const { configData, entry, page, searchQuery, searchTab, setEntry: setEntry, setPage, setSearchTab, viewport } = this.state
		return (
			<>
				<Header
					config={configData.config}
					setPage={setPage}
					setEntry={setEntry}
				/>
				<PageView
					config={configData.config}
					entry={entry}
					page={page}
					setPage={setPage}
				/>
				<this.props.EntrySelector
					config={configData.config}
					entry={entry}
					searchTab={searchTab}
					setEntry={setEntry}
					setSearchTab={setSearchTab}
					viewport={viewport}
				/>
				<EntryComp 
					configData={configData}
					entry={entry}
					viewport={viewport}
					searchTab={searchTab}
					searchQuery={searchQuery}
					setEntry={setEntry}
				/>
			</>
		)
	}

	private setSearchTab(searchTab: SearchTab) {
		if (searchTab === SearchTab.Results && this.state.searchTab === SearchTab.Results) this.setState({ searchTab: null })
		else if (searchTab === SearchTab.Results) this.setState({ searchTab })
		else if (searchTab === SearchTab.Search) this.setEntry()
	}

	protected async setEntry(entryId?: string, push = true) {
		this.lastEntryId = entryId

		const entry = entryId == null ? null : await this.getEntry(entryId)

		const nextState: Partial<AppState> = {
			entry,
			page: null,
			viewport: Viewport.Entry,
		}

		if (entryId == null) {
			nextState.viewport = Viewport.Search
			nextState.searchTab = null
		}

		this.setState(
			nextState as any,
			() => this.afterSetEntry(entryId, push)
		)
	}

	protected async setPage(id: string, push = true) {
		if (id == null) {
			this.setEntry(this.lastEntryId)
			return
		}

		const page = await this.getPage(id)
		console.log(page)

		this.setState(
			{ entry: null, page },
			() => this.afterSetPage(page, push)
		)
	}

	protected afterComponentDidMount() {}
	protected afterSetEntry(_entryId: string, _push: boolean) {}
	protected afterSetPage(_page: Page, _push: boolean) {}

	protected async getPage(id: string): Promise<Page> {
		const pageConfig = this.props.configData.config.pages.find(p => p.id === id)
		const doc = await this.getPageDoc(pageConfig)
		return {
			...pageConfig,
			doc,
		}
	}
	protected async getEntry(id: string): Promise<Entry> {
		let doc = await this.getEntryDoc(id)

		doc = this.props.configData.prepareDocument(doc, this.props.configData.config)

		const facsimiles = this.props.configData.extractFacsimiles(doc)
		const metadata = this.props.configData.extractMetadata(doc)
		const notes = this.props.configData.extractNotes(doc)
		const textData = this.props.configData.extractTextData(doc, this.props.configData.config)
		const textLayers = this.props.configData.extractTextLayers(doc, this.props.configData.config)

		return {
			id,
			doc,
			facsimiles,
			metadata,
			notes,
			textData,
			textLayers
		}
	}
}
