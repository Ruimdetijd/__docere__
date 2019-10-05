import * as React from 'react'
// import { fetchEntryXml } from '../utils'
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
	// input: string
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	orientation: Orientation
	setAsideTab: (asideTab: AsideTab) => void
	setFooterTab: (footerTab: FooterTab) => void
	textData: ExtractedTextData
	textLayers: ExtractedTextLayers
	togglePanel: (panelId: string) => void
	wordwrap: boolean
}

export type EntryProps = Pick<AppState, 'configData' | 'entryId' | 'getEntryDoc' | 'viewport' | 'searchTab' | 'searchQuery' | 'setEntryId'>
export default class Entry extends React.PureComponent<EntryProps, EntryState> {
	state: EntryState = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: null,
		activePanels: this.props.configData.config.textlayers,
		asideTab: null,
		doc: null,
		facsimiles: [],
		footerTab: null,
		hasScroll: false,
		// input: null,
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
		textLayers: {},
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

	componentDidUpdate(prevProps: EntryProps) {
		if (prevProps.entryId !== this.props.entryId) this.loadDoc()
		if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
	}

	render() {
		if (this.state.doc == null) return null

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
		if (this.props.entryId == null) return

		let doc = await this.props.getEntryDoc()
		// if (this.props.entryId != null) {
		// 	doc = await fetchEntryXml(this.props.configData.config.slug, this.props.entryId)
		// } else if (this.props.xml != null) {
		// 	const domParser = new DOMParser()
		// 	doc = domParser.parseFromString(this.props.xml, 'application/xml')
		// }

		// console.log(this.props.prepareDocument)

		doc = this.props.configData.prepareDocument(doc, this.props.configData.config)
		// console.log(this.props.prepareDocument, 'DONE')
		// return

		const facsimiles = this.props.configData.extractFacsimiles(doc)
		const metadata = this.props.configData.extractMetadata(doc)
		const notes = this.props.configData.extractNotes(doc)
		const textData = this.props.configData.extractTextData(doc, this.props.configData.config)
		const textLayers = this.props.configData.extractTextLayers(doc, this.props.configData.config)
		const activeFacsimilePath = facsimiles.length ? facsimiles[0].path[0] : null

		this.setState({
			doc,
			activeFacsimilePath, 
			facsimiles,
			metadata,
			notes,
			textData,
			textLayers
		})

		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		if (hasScroll) this.setState({ hasScroll })
	}
}
