import * as React from 'react'
import { Main } from './index.components'
import Panels from './panels'
import Aside from './aside'
import Footer from './footer'
import useEntryState from './state'

function Entry(props: EntryProps) {
	if (props.entry == null) return null

	const [entryState, entryStateDispatch] = useEntryState(props.entry)

	return (
		<Main
			asideTab={entryState.asideTab}
			footerTab={entryState.footerTab}
			searchTab={props.searchTab}
		>
			<Panels
				activeEntity={entryState.activeEntity}
				activeNote={entryState.activeNote}
				activeFacsimilePath={entryState.activeFacsimilePath}
				asideTab={entryState.asideTab}
				activeFacsimileAreas={entryState.activeFacsimileAreas}
				dispatch={entryStateDispatch}
				entry={props.entry}
				footerTab={entryState.footerTab}
				layers={entryState.layers}
				searchTab={props.searchTab}
				setEntry={props.setEntry}
			/>
			<Aside
				activeEntity={entryState.activeEntity}
				activeNote={entryState.activeNote}
				asideTab={entryState.asideTab}
				dispatch={entryStateDispatch}
				entry={props.entry}
				layers={entryState.layers}
				setEntry={props.setEntry}

			/>
			<Footer
				dispatch={entryStateDispatch}
				footerTab={entryState.footerTab}
				layers={entryState.layers}
			/>
		</Main>
	)
}

export default React.memo(Entry)


// import useDocereComponentState from './reducers/docere-component-state'

			// activeFacsimilePath: this.props.activeFacsimilePath,
			// activeId: this.props.activeId,
			// activeListId: this.props.activeListId,
			// config: this.props.configData.config,
			// facsimiles: this.props.entry.facsimiles,
			// insideNote: false,
			// setActiveFacsimile: this.props.setActiveFacsimile,
			// setActiveId: this.props.setActiveId,
			// setEntry: this.props.setEntry,
			// setFacsimileArea: this.setFacsimileArea,
			// textLayer: null,
			// viewport: this.props.viewport,


// export default class Entry extends React.PureComponent<EntryProps, EntryState> {
// 	state: EntryState = {
// 		// activeFacsimilePath: null,
// 		// activeId: null,
// 		// activeListId: null,
// 		// activePanels: this.props.configData.config.textLayers,
// 		activePanels: [],
// 		asideTab: null,
// 		footerTab: null,
// 		// hasScroll: false,
// 		setAsideTab: (asideTab: AsideTab) => {
// 			if (this.state.asideTab === asideTab) asideTab = null
// 			this.setState({ asideTab })
// 		},
// 		setFooterTab: (footerTab: FooterTab) => {
// 			if (this.state.footerTab === footerTab) footerTab = null
// 			this.setState({ footerTab })
// 		},
// 		togglePanel: (panelId: string) => {
// 			const activePanels = this.state.activePanels.map(ap =>
// 				(ap.id === panelId) ? ({ ...ap, active: !ap.active }) : ap
// 			)
// 			this.setState({ activePanels })
// 		},
// 	}

	// async componentDidMount() {
	// 	await this.updateState()
	// }

	// componentDidUpdate(prevProps: EntryProps) {
	// 	if (this.props.entry == null) return
	// 	if (prevProps.entry == null || (prevProps.entry.id !== this.props.entry.id)) this.updateState()
	// 	if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
	// }

	// render() {
// 	private setActiveId: SetActiveId = (activeId: string, activeListId: string, asideTab: AsideTab) => {
// 		if (activeListId === this.state.activeListId && activeId === this.state.activeId) activeId = null
// 		const nextState: Partial<EntryState> = { activeId, activeListId }
// 		if (asideTab != null && this.state.asideTab !== asideTab) nextState.asideTab = asideTab
// 		this.setState(nextState as any)
// 	}

// 	private async updateState() {
// 		if (this.props.entry == null) return
// 		const { facsimiles, textLayers } = this.props.entry

// 		const nextState: Partial<EntryState> = {}
// 		nextState.activeFacsimilePath = facsimiles.length ? facsimiles[0].path[0] : null

// 		nextState.activePanels = textLayers

// 		this.setState(nextState as EntryState)
// 	}

// 	private setActiveFacsimile = (activeFacsimilePath: string) => this.setState({ activeFacsimilePath })
// }
