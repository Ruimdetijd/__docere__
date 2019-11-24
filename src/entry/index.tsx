import * as React from 'react'
import { Main } from './index.components'
import Panels from './panels'
import Aside from './aside'
import Footer from './footer'
import { FooterTab } from '../constants'

export interface EntryState {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	activePanels: TextLayerConfig[]
	asideTab: AsideTab
	footerTab: FooterTab
	hasScroll: boolean
	orientation: Orientation
	setAsideTab: (asideTab: AsideTab) => void
	setFooterTab: (footerTab: FooterTab) => void
	togglePanel: (panelId: string) => void
	wordwrap: boolean
}

export type EntryProps = Pick<AppState, 'configData' | 'entry' | 'searchQuery' | 'searchTab' | 'setEntry' | 'viewport'>
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
		orientation: Orientation.Horizontal,
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
		wordwrap: false,
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
					setActiveFacsimile={(activeFacsimilePath: string) => this.setState({ activeFacsimilePath })}
					setActiveId={this.setActiveId}
					togglePanelOrientation={() =>
						this.setState({
							orientation: this.state.orientation === Orientation.Horizontal ?
								Orientation.Vertical :
								Orientation.Horizontal
						})
					}
					toggleWordWrap={() => this.setState({ wordwrap: !this.state.wordwrap })}
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
		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		nextState.hasScroll = hasScroll

		nextState.activePanels = textLayers

		this.setState(nextState as EntryState)
	}
}
