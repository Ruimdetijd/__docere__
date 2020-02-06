import * as React from 'react'
import { AsideTab } from '../../constants'

const initialEntryState: EntryState = {
	activeFacsimilePath: null,
	activeEntity: null,
	activeNote: null,
	activeFacsimileAreas: [],
	entry: null,
	layers: [],
	asideTab: null,
	footerTab: null,
}

function entryStateReducer(entryState: EntryState, action: EntryStateAction): EntryState {
	console.log(action)
	const { type, ...payload } = action
	switch (action.type) {
		case 'ENTRY_CHANGED': {
			return {
				...initialEntryState,
				...payload,
			}
		}

		case 'SET_ENTITY': {
			let activeFacsimileAreas = entryState.entry.facsimileAreas
				.filter(fa => fa.target?.id === action.id)

			let activeEntity = entryState.entry.entities.find(e => e.id === action.id)

			if (action.id === entryState.activeEntity?.id) {
				activeEntity = null
				activeFacsimileAreas = []
			}
			
			return {
				...entryState,
				activeEntity,
				activeFacsimileAreas,
				asideTab: AsideTab.TextData
			}
		}

		case 'SET_NOTE': {
			return {
				...entryState,
				activeNote: entryState.entry.notes.find(n => n.id === action.id),
				asideTab: AsideTab.Notes
			}
		}

		case 'TOGGLE_ASIDE_TAB': {
			const asideTab: AsideTab = (entryState.asideTab === action.asideTab) ? null : action.asideTab
			return {
				...entryState,
				asideTab,
			}
		}

		case 'TOGGLE_FOOTER_TAB': {
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
			let activeFacsimileAreas = entryState.entry.facsimileAreas
				.filter(fa => action.ids.indexOf(fa.id) > -1)

			if (JSON.stringify(action.ids) === JSON.stringify(entryState.activeFacsimileAreas.map(afa => afa.id))) {
				activeFacsimileAreas = []
			}

			return {
				...entryState,
				activeFacsimileAreas,
				activeEntity: null,
				activeNote: null,
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
