import * as React from 'react'
import { AsideTab } from '../../constants'

const initialEntryState: EntryState = {
	activeFacsimile: null,
	activeEntity: null,
	activeNote: null,
	activeFacsimileAreas: null,
	entry: null,
	layers: [],
	asideTab: null,
	footerTab: null,
}

function entryStateReducer(entryState: EntryState, action: EntryStateAction): EntryState {
	if ((window as any).DEBUG) console.log('[EntryState]', action)

	const { type, ...payload } = action
	switch (action.type) {
		case 'ENTRY_CHANGED': {
			return {
				...initialEntryState,
				...payload,
			}
		}

		case 'SET_ENTITY': {
			let activeFacsimileAreas = entryState.entry.facsimiles
				.reduce((prev, curr) => {
					curr.versions.forEach(version => {
						version.areas.forEach(area => {
							if (area.target?.id === action.id) {
								if (!Array.isArray(prev)) prev = []
								prev.push(area)
							}
						})
					})
					return prev
				}, null as FacsimileArea[])

			let activeEntity = entryState.entry.entities.find(e => e.id === action.id)

			if (action.id === entryState.activeEntity?.id) {
				activeEntity = null
				activeFacsimileAreas = null
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

		case 'SET_ACTIVE_FACSIMILE': {
			const activeFacsimile = entryState.entry.facsimiles.find(f => f.id === action.id)

			return {
				...entryState,
				activeFacsimile,
				activeFacsimileAreas: null
			}
		}

		case 'SET_ACTIVE_FACSIMILE_AREAS': {
			let activeFacsimileAreas = entryState.entry.facsimiles
				.reduce((prev, curr) => {
					curr.versions.forEach(version => {
						version.areas.forEach(area => {
							if (action.ids.indexOf(area.id) > -1) prev.push(area)
						})
					})
					return prev
				}, [] as FacsimileArea[])
			
			if (JSON.stringify(action.ids) === JSON.stringify(entryState.activeFacsimileAreas?.map(afa => afa.id))) {
				activeFacsimileAreas = null
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
			activeFacsimile: entry.facsimiles.length ? entry.facsimiles[0] : null,
			entry,
			layers: entry.layers,
			type: 'ENTRY_CHANGED',
		})
	}, [entry])

	return x
}
