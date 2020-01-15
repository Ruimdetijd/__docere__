import * as React from 'react'
import { Main } from './index.components'
import Panels from './panels'
import Aside from './aside'
import Footer from './footer'

export default class Entry extends React.PureComponent<EntryProps, EntryState> {
	state: EntryState = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: null,
		// activePanels: this.props.configData.config.textLayers,
		activePanels: [],
		asideTab: null,
		footerTab: null,
		hasScroll: false,
		setAsideTab: (asideTab: AsideTab) => {
			if (this.state.asideTab === asideTab) asideTab = null
			this.setState({ asideTab })
		},
		setFooterTab: (footerTab: FooterTab) => {
			if (this.state.footerTab === footerTab) footerTab = null
			this.setState({ footerTab })
		},
		togglePanel: (panelId: string) => {
			const activePanels = this.state.activePanels.map(ap =>
				(ap.id === panelId) ? ({ ...ap, active: !ap.active }) : ap
			)
			this.setState({ activePanels })
		},
	}

	async componentDidMount() {
		await this.updateState()
	}

	componentDidUpdate(prevProps: EntryProps) {
		if (this.props.entry == null) return
		if (prevProps.entry == null || (prevProps.entry.id !== this.props.entry.id)) this.updateState()
		if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
	}

	render() {
		if (this.props.entry == null) return null

		return (
			<Main
				asideTab={this.state.asideTab}
				footerTab={this.state.footerTab}
				searchTab={this.props.searchTab}
			>
				<Panels
					{...this.props}
					{...this.state}
					setActiveFacsimile={this.setActiveFacsimile}
					setActiveId={this.setActiveId}
				/>
				<Aside
					{...this.props}
					{...this.state}
					setActiveId={this.setActiveId}
				/>
				<Footer
					{...this.props}
					{...this.state}
				/>
			</Main>
		)
	}

	private setActiveId: SetActiveId = (activeId: string, activeListId: string, asideTab: AsideTab) => {
		if (activeListId === this.state.activeListId && activeId === this.state.activeId) activeId = null
		const nextState: Partial<EntryState> = { activeId, activeListId }
		if (asideTab != null && this.state.asideTab !== asideTab) nextState.asideTab = asideTab
		this.setState(nextState as any)
	}

	private async updateState() {
		if (this.props.entry == null) return
		const { facsimiles, textLayers } = this.props.entry

		const nextState: Partial<EntryState> = {}
		nextState.activeFacsimilePath = facsimiles.length ? facsimiles[0].path[0] : null

		nextState.activePanels = textLayers

		this.setState(nextState as EntryState)
	}

	private setActiveFacsimile = (activeFacsimilePath: string) => this.setState({ activeFacsimilePath })
}
