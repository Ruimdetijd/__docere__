import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import defaultDocereConfigData from 'docere-config'
import Header from './header'
import Entry from './entry'
import PageView from './page'
import Search from './search'
import { TOP_OFFSET, Viewport } from './constants'

export const Main = styled('div')`
	background-color: white;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: ${TOP_OFFSET}px auto;
	width: 100%;
`

// BUGS
// TODO fix faceted search Reset button
// TODO fix text view scrollbar (mouse not working because of metadata/textdata tabs)

// Asides
// TODO results and metadata show at same time
// TODO replace first letter of tab with icon + tooltip text
// TODO create media aside
// TODO create notes aside

// Navigation
// TODO use popstate for detecting back-button
// TODO add link to search in header and change link in h1 to ${config.slug}/home
// TODO every project has a home

// Footer menu
// TODO move portrait/landscape button and TEI download button to footer menu
// TODO add panels/layers

// Links
// TODO link to search result
// TODO link to part of text (<pb>, <lb>, <p>, etc)
// TODO create citation

// Annotations
// TODO differentiate between machine and user annotations
// TODO add search link to annotation

// Search
// TODO add sort
// TODO when clicking facsimile in search results, activate and scroll to that facsimile in entry view
// TODO add middle page in search result pagination ie: 1 2 3 ... 10 ... 18 19 20 (add the 10)

// Rest
// TODO i8n, user interface + pages
// TODO add help tooltips and turn on/off help
// TODO add facs navigator (see AF or eLaborate)
// TODO create marketing page for Docere and create link from edition to marketing page
// TODO dedup @emotion from docere, huc-faceted-search, docere-text-view
// TODO index and create facet for background pages
// TODO create a test runner for the configuration to check if the config is OK and all the XML is valid

// interface Props extends DocereConfigData {
// 	entryId: AppState['entryId']
// 	pageId: AppState['pageId']
// }
type Props = Pick<AppState, 'config' | 'entryId' | 'extractFacsimiles' | 'extractMetadata' | 'extractTextData' | 'pageId' | 'prepareDocument' | 'viewport'>

class App extends React.Component<Props, AppState> {
	private lastEntryId: string

	state: AppState = {
		...this.props,
		searchQuery: null,
		setAppState: (key, value) => this.setState({ [key]: value } as any),
		setEntryId: (entryId: string) => this.setEntryId(entryId),
		setPage: (page: Page) => this.setPage(page),
	}

	render() {
		return (
			<Main>
				<Header {...this.state}/>
				<PageView {...this.state}/>
				<Search {...this.state}/>
				<Entry {...this.state}/>
			</Main>
		)
	}

	private setPage(page: Page) {
		if (page == null) {
			this.setEntryId(this.lastEntryId)
			return
		}

		this.setState({ entryId: 'pages', pageId: page.id })
		history.pushState({}, page.title, `/${this.props.config.slug}/pages/${page.id}`)
	}

	private setEntryId(entryId?: string) {
		this.lastEntryId = entryId

		let url = `/${this.props.config.slug}`
		if (entryId != null) url += `/${entryId}`

		let viewport = Viewport.Entry
		if (entryId == null) viewport = Viewport.Search
		else if (this.state.viewport === Viewport.Results) viewport = Viewport.Results

		this.setState({ entryId, viewport, pageId: null })
		history.pushState({}, this.props.config.title, url)
	}
}

document.addEventListener('DOMContentLoaded', async function() {
	const [, projectSlug, entryId, pageId] = window.location.pathname.split('/')
	const dcdImport: { default: DocereConfigData } = await import(`docere-config/projects/${projectSlug}/index.js`)
	const container = document.getElementById('container')

	let viewport = Viewport.Search
	if (pageId != null) viewport = Viewport.Page
	else if (entryId != null) viewport = Viewport.Entry

	ReactDOM.render(
		<App
			{...defaultDocereConfigData}
			{...dcdImport.default}
			config={{...defaultDocereConfigData.config, ...dcdImport.default.config}}
			entryId={entryId}
			pageId={pageId}
			viewport={viewport}
		/>,
		container
	)
})
