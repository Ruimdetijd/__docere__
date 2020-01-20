import * as React from 'react'
import { AsideTab } from '../../constants'

const initialEntryState: EntryState = {
	activeFacsimilePath: null,
	activeId: null,
	activeListId: null,
	activeFacsimileAreas: [],
	entry: null,
	layers: [],
	asideTab: null,
	footerTab: null,
}

function entryStateReducer(entryState: EntryState, action: EntryStateAction): EntryState {
	console.log(action)
	switch (action.type) {
		case 'ENTRY_CHANGED': {
			return {
				...initialEntryState,
				activeFacsimilePath: action.activeFacsimilePath,
				entry: action.entry,
				layers: action.layers,
			}
		}

		case 'SET_ACTIVE_ID': {
			const activeFacsimileAreas = entryState.entry.facsimileAreas
				.filter(fa => fa.target?.activeId === action.activeId)

			return {
				...entryState,
				activeFacsimileAreas,
				activeId: action.activeId,
				activeListId: action.activeListId,
				asideTab: action.asideTab,
			}
		}

		case 'SET_TEXT_DATA_ID': {
			const activeFacsimileAreas = entryState.entry.facsimileAreas
				.filter(fa => fa.target?.activeId === action.activeId)

			return {
				...entryState,
				activeFacsimileAreas,
				activeId: action.activeId,
				activeListId: action.activeListId,
				asideTab: AsideTab.TextData
			}
		}

		case 'SET_NOTE_ID': {
			return {
				...entryState,
				activeId: action.activeId,
				activeListId: action.activeListId,
				asideTab: AsideTab.Notes
			}
		}

		case 'SET_ACTIVE_LIST_ID': {
			return {
				...entryState,
				activeListId: action.activeListId
			}
		}

		case 'SET_ASIDE_TAB': {
			const asideTab: AsideTab = (entryState.asideTab === action.asideTab) ? null : action.asideTab
			return {
				...entryState,
				asideTab,
			}
		}

		case 'SET_FOOTER_TAB': {
			const footerTab: FooterTab = (entryState.footerTab === action.footerTab) ? null : action.footerTab
			return {
				...entryState,
				footerTab,
			}
		}

		case 'SET_ACTIVE_FACSIMILE_PATH': {
			return {
				...entryState,
				activeFacsimilePath: action.src,
			}
		}

		case 'SET_FACSIMILE_AREAS': {
			const activeFacsimileAreas = entryState.entry.facsimileAreas
				.filter(fa => action.ids.indexOf(fa.id) > -1)

			return {
				...entryState,
				activeFacsimileAreas,
				activeId: null,
				activeListId: null,
				asideTab: null
			}
		}

		case 'TOGGLE_LAYER': {
			return {
				...entryState,
				layers: entryState.layers.map(l => {
					if (l.id === action.id) {
						l.active = !l.active
					}
					return l
				})
			}
		}

		default:
			break
	}

	return entryState
}


export default function useEntryState(entry: Entry) {
	const x = React.useReducer(entryStateReducer, initialEntryState)

	React.useEffect(() => {
		if (entry == null) return

		// x[1] = dispatch
		x[1]({
			activeFacsimilePath: entry.facsimiles.length ? entry.facsimiles[0].path[0] : null,
			entry,
			layers: entry.textLayers,
			type: 'ENTRY_CHANGED',
		})
	}, [entry])

	return x
}
