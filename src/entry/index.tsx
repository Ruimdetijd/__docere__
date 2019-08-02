import * as React from 'react'
import { fetchEntryXml } from '../utils'
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
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	footerTab: FooterTab
	hasScroll: boolean
	input: string
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	orientation: Orientation
	setAsideTab: (asideTab: AsideTab) => void
	setFooterTab: (footerTab: FooterTab) => void
	textData: ExtractedTextData
	togglePanel: (panelId: string) => void
	wordwrap: boolean
}

export default class Entry extends React.PureComponent<AppState, EntryState> {
	state: EntryState = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: null,
		activePanels: this.props.config.textlayers,
		asideTab: null,
		doc: null,
		facsimiles: [],
		footerTab: null,
		hasScroll: false,
		input: null,
		metadata: {},
		notes: {},
		orientation: Orientation.Horizontal,
		setAsideTab: (asideTab: AsideTab) => {
			if (this.state.asideTab === asideTab) asideTab = null
			this.setState({ asideTab })
		},
		setFooterTab: (footerTab: FooterTab) => {
			if (this.state.footerTab === footerTab) footerTab = null
			this.setState({ footerTab })
		},
		textData: {},
		togglePanel: (panelId: string) => {
			const activePanels = this.state.activePanels.map(ap =>
				(ap.id === panelId) ? ({ ...ap, active: !ap.active }) : ap
			)
			this.setState({ activePanels })
		},
		wordwrap: false,
	}

	async componentDidMount() {
		if (this.props.entryId != null) await this.loadDoc()
	}

	componentDidUpdate(prevProps: AppState) {
		if (prevProps.entryId !== this.props.entryId) this.loadDoc()
		if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
	}

	render() {
		if (this.state.doc == null) return null

		console.log(this.state.activeId)

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

	private async loadDoc() {
		let doc = await fetchEntryXml(this.props.config.slug, this.props.entryId)
		doc = this.props.prepareDocument(doc, this.props.config)

		const facsimiles = this.props.extractFacsimiles(doc)
		const metadata = this.props.extractMetadata(doc)
		const notes = this.props.extractNotes(doc)
		const textData = this.props.extractTextData(doc, this.props.config)
		const activeFacsimilePath = facsimiles.length ? facsimiles[0].path[0] : null

		this.setState({
			doc,
			activeFacsimilePath, 
			facsimiles,
			metadata,
			notes,
			textData,
		})

		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		if (hasScroll) this.setState({ hasScroll })
	}
}
