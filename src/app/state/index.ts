import * as React from 'react'
import getEntry from './get-entry'
import getPage from './get-page'
import { analyzeWindowLocation } from '../../utils'
import { SearchTab } from '../../constants'

const initialAppState: AppState = {
	entryId: null,
	entry: null,
	pageId: null,
	page: null,
	searchQuery: null,
	searchTab: null,
	viewport: null
}

function appStateReducer(appState: AppState, action: AppStateAction): AppState {
	if ((window as any).DEBUG) console.log('[AppState]', action)

	switch (action.type) {
		case 'PROJECT_CHANGED': {
			let viewport = appState.viewport
			if (action.entryId != null) viewport = Viewport.Entry
			if (action.pageId != null) viewport = Viewport.Page

			return {
				...appState,
				entryId: action.entryId,
				pageId: action.pageId,
				viewport,
			}
		}

		case 'SET_ENTRY_ID': {
			// searchTab cannot be Search when viewport is Entry
			const searchTab = appState.searchTab === SearchTab.Search ?
				null :
				appState.searchTab

			

			return {
				...appState,
				entryId: action.id,
				searchTab,
				viewport: Viewport.Entry,
			}
		}

		case 'SET_ENTRY': {
			return {
				...appState,
				entry: action.entry,
			}
		}

		case 'SET_PAGE_ID': {
			return {
				...appState,
				pageId: action.id,
				viewport: Viewport.Page,
			}
		}

		case 'SET_PAGE': {
			return {
				...appState,
				page: action.page,
			}
		}

		case 'UNSET_PAGE': {
			return {
				...appState,
				page: null,
				pageId: null
			}
		}

		case 'SET_SEARCH_TAB': {
			// if searchTab is Search, viewport has to be EntrySelector
			// and if searchTab is Results, viewport has to be Entry
			const viewport = action.tab === SearchTab.Search ?
				Viewport.EntrySelector :
				Viewport.Entry

			const searchTab = appState.searchTab === action.tab ? null : action.tab

			return {
				...appState,
				searchTab,
				viewport
			}
		}

		case 'SET_VIEWPORT': {
			let searchTab = appState.searchTab
			// if viewport is EntrySelector, searchTab has to be Search
			if (action.viewport === Viewport.EntrySelector) searchTab = SearchTab.Search
			// if viewport is Entry, searchTab cannot be Search
			if (action.viewport === Viewport.Entry && appState.searchTab === SearchTab.Search) searchTab = null

			return {
				...appState,
				searchTab,
				viewport: action.viewport
			}
		}

		default:
			break
	}

	return appState
}


export default function useAppState(configData: DocereConfigData) {
	const x = React.useReducer(appStateReducer, initialAppState)

	React.useEffect(() => {
		const { documentId, documentType } = analyzeWindowLocation()

		window.addEventListener('popstate', () => {
			const { documentId, documentType } = analyzeWindowLocation()
			if (documentType == null) x[1]({ type: 'SET_VIEWPORT', viewport: Viewport.EntrySelector })
			if (documentId == 'entries') x[1]({ type: 'SET_ENTRY_ID', id: documentId })
			if (documentId == 'pages') x[1]({ type: 'SET_PAGE_ID', id: documentId })
		})

		// x[1] = dispatch
		x[1]({
			entryId: documentType === 'entries' ? documentId : null,
			type: 'PROJECT_CHANGED',
			pageId: documentType === 'pages' ? documentId : null
		})
	}, [])

	React.useEffect(() => {
		if (x[0].entryId == null) return
		getEntry(x[0].entryId, configData).then(entry => x[1]({ type: 'SET_ENTRY', entry }))
	}, [configData, x[0].entryId])

	React.useEffect(() => {
		if (x[0].pageId == null) return
		getPage(x[0].pageId, configData).then(page => x[1]({ type: 'SET_PAGE', page }))
	}, [configData, x[0].pageId])

	React.useEffect(() => {
		if (x[0].viewport === Viewport.EntrySelector) {
			const title = `${configData.config.title} - Search`
			history.pushState({}, title, `/${configData.config.slug}`)
			document.title = title
		}

		if (x[0].viewport === Viewport.Entry) {
			const title = `${configData.config.title} - ${x[0].entryId}`
			history.pushState({}, title, `/${configData.config.slug}/entries/${x[0].entryId}`)
			document.title = title
		}

		if (x[0].viewport === Viewport.Page) {
			const title = `${configData.config.title} - ${x[0].page.title}`
			history.pushState({}, title, `/${configData.config.slug}/pages/${x[0].pageId}`)
			document.title = title
		}
	}, [x[0].viewport, x[0].entryId, x[0].pageId])

	return x
}
