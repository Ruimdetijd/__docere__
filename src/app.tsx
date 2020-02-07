import * as React from 'react'
import EntryComp from './entry'
import PageView from './page'
import { SearchTab } from './constants'
import EntrySelector from './entry-selector'
import Header from './header'
import { extendTextLayer, defaultFacsimileArea } from './export/extend-config-data'

// TODO move to types.d.ts, but first replace EntrySelector
type AppProps = { configData: DocereConfigData } & { entryId: string, EntrySelector: typeof EntrySelector, pageId: string }

export default abstract class App extends React.PureComponent<AppProps, AppState> {
	// Remember the last entry. When user closes a Page, we can return
	// to the last viewed entry
	// TODO use history api?
	private lastEntryId: string

	state: AppState = {
		entry: null,
		page: null,
		searchQuery: null,
		searchTab: null,
		setEntry: (id: string) => this.setEntry(id),
		setPage: (id: string) => this.setPage(id),
		setSearchTab: (tab: SearchTab) => this.setSearchTab(tab),
	}

	protected abstract async getEntryDoc(entryId: string): Promise<XMLDocument>
	protected abstract async getPageDoc(pageConfig: PageConfig): Promise<XMLDocument>

	async componentDidMount() {
		let title = this.props.configData.config.title

		const nextState: Partial<AppState> = {
			entry: null,
			page: null,
			searchTab: SearchTab.Search
		}

		if (this.props.pageId != null) {
			nextState.page = await this.getPage(this.props.pageId)
			document.title = `${title} - ${nextState.page.title}`
		}
		else if (this.props.entryId != null) {
			nextState.entry = await this.getEntry(this.props.entryId)
			document.title = `${title} - ${nextState.entry.id}`
		}

		this.setState(nextState as AppState, () => this.afterComponentDidMount())
	}

	render() {
		const { entry, page, searchTab, setEntry: setEntry, setPage, setSearchTab } = this.state
		return (
			<>
				<Header
					setPage={setPage}
					setEntry={setEntry}
				/>
				<PageView
					page={page}
					setPage={setPage}
				/>
				<this.props.EntrySelector
					entry={entry}
					searchTab={searchTab}
					setEntry={setEntry}
					setSearchTab={setSearchTab}
				/>
				<EntryComp 
					entry={entry}
					searchTab={searchTab}
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
			searchTab: null
		}

		if (entryId == null) {
			nextState.searchTab = SearchTab.Search
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

		this.setState(
			{ entry: null, page },
			() => this.afterSetPage(page, push)
		)
	}

	protected afterComponentDidMount() {}
	protected afterSetEntry(_entryId: string, _push: boolean) {}
	protected afterSetPage(_page: Page, _push: boolean) {}

	protected async getPage(id: string): Promise<Page> {
		// Flatten pages before using .find
		const pages = this.props.configData.config.pages.reduce((prev, curr) => {
			if (Array.isArray(curr.children)) prev.push(...curr.children)
			prev.push(curr)
			return prev
		}, [])

		const pageConfig = pages.find(p => p.id === id)
		const doc = await this.getPageDoc(pageConfig)

		return {
			...pageConfig,
			doc,
		}
	}
	protected async getEntry(id: string): Promise<Entry> {
		let doc = await this.getEntryDoc(id)
		doc = this.props.configData.prepareDocument(doc, this.props.configData.config, id)

		let textLayers = this.props.configData.extractTextLayers(doc, this.props.configData.config)
			// Extend the extracted text layers with their config
			.map(tl => extendTextLayer(tl, this.props.configData.config.textLayers))

		// The "other" layers are layers that are not found by extractTextLayers, but are defined in the config
		const otherLayers = this.props.configData.config.textLayers.filter(tl => textLayers.find(tl2 => tl.id === tl2.id) == null)

		// The "other" layers don't have an element, so they will use the whole XMLDocument
		textLayers = await Promise.all(otherLayers.map((ol: Layer) => { ol.element = doc; return ol }).concat(textLayers)
			.map(async (tl) => {
				const etl = extendTextLayer(tl, this.props.configData.config.textLayers)
				if (etl.hasOwnProperty('xmlPath')) {
					const doc = await this.getEntryDoc(etl.xmlPath(id))
					if (doc != null) {
						etl.element = this.props.configData.prepareDocument(doc, this.props.configData.config, id, etl)
					}
				}
				return etl
			}))

		return {
			id,
			doc,
			facsimiles: this.props.configData.extractFacsimiles(doc),
			metadata: this.props.configData.extractMetadata(doc, this.props.configData.config, id),
			notes: this.props.configData.extractNotes(doc),
			entities: this.props.configData.extractTextData(doc, this.props.configData.config),
			facsimileAreas: this.props.configData.extractFacsimileAreas(doc, this.props.configData.config).map(fa => ({ ...defaultFacsimileArea, ...fa })),
			textLayers
		}
	}
}
