import * as React from 'react'
import { fetchEntryXml } from '../utils'
import { Main } from './index.components'
import Panels from './panels'
import Aside from './aside'
import Footer from './footer'

export interface EntryState {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	activePanels: TextLayerConfig[]
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	hasScroll: boolean
	input: string
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	orientation: Orientation
	textData: ExtractedTextData
	togglePanel: (panelId: string) => void
	wordwrap: boolean
}

export default class Entry extends React.PureComponent<AppState, EntryState> {
	state: EntryState = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: this.props.config.textdata.length ? this.props.config.textdata[0].id : null,
		activePanels: this.props.config.textlayers,
		doc: null,
		facsimiles: [],
		hasScroll: false,
		input: null,
		metadata: {},
		notes: {},
		orientation: Orientation.Horizontal,
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
		await this.loadDoc()
	}

	componentDidUpdate(prevProps: AppState) {
		if (prevProps.entryId !== this.props.entryId) this.loadDoc()
		if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
	}

	render() {
		if (this.state.doc == null) return null

		return (
			<Main
				viewport={this.props.viewport}
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

	private setActiveId = (activeListId: string, activeId: string) => {
		if (activeListId === this.state.activeListId && activeId === this.state.activeId) activeId = null
		this.setState({ activeId, activeListId })
	}

	private async loadDoc() {
		let doc = await fetchEntryXml(this.props.config.slug, this.props.entryId)
		doc = this.props.prepareDocument(doc, this.props.config)

		const facsimiles = this.props.extractFacsimiles(doc)
		const metadata = this.props.extractMetadata(doc)
		const notes = this.props.extractNotes(doc)
		const textData = this.props.extractTextData(doc, this.props.config)
		const activeFacsimilePath = facsimiles.length ? facsimiles[0].path : null

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
