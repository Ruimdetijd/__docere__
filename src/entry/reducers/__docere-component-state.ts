import * as React from 'react'

const initialDocereComponentState: DocereComponentState = {
	activeFacsimilePath: null,
	activeId: null,
	activeListId: null,
	// config: null,
	// facsimiles: [],
	// insideNote: false,
	// textLayerId: null,
	// viewport: null
}

function docereComponentStateReducer(docereComponentState: DocereComponentState, action: DocereComponentStateAction): DocereComponentState {
	console.log(action)
	switch (action.type) {
		case 'ENTRY_CHANGED': {
			return {
				...initialDocereComponentState,
				activeFacsimilePath: action.activeFacsimilePath,
			}
		}

		case 'SET_ACTIVE_ID': {
			return {
				...initialDocereComponentState,
				activeId: action.id,
				activeListId: action.listId
			}
		}

		case 'SET_ACTIVE_LIST_ID': {
			return {
				...initialDocereComponentState,
				activeListId: action.id
			}
		}
	}

	return docereComponentState
}

export default function useDocereComponentState(entry: Entry) {
	const x = React.useReducer(docereComponentStateReducer, initialDocereComponentState)

	React.useEffect(() => {
		if (entry == null) return

		// x[1] = dispatch
		x[1]({
			type: 'ENTRY_CHANGED',
			activeFacsimilePath: entry.facsimiles.length ? entry.facsimiles[0].path[0] : null,
		})
	}, [entry])

	return x
}
