import * as React from 'react'
import { fetchEntryXml } from '../utils'
import { Main } from './index.components'
import Panels from './panels'
import Aside from './aside'
import Footer from './footer'

export interface State {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	activePanels: TextLayerConfig[]
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	hasScroll: boolean
	input: string
	metadata: ExtractedMetadata
	orientation: Orientation
	wordwrap: boolean
}

export default class Entry extends React.PureComponent<AppState, State> {
	state: State = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: this.props.config.textdata.length ? this.props.config.textdata[0].id : null,
		activePanels: [],
		doc: null,
		facsimiles: [],
		hasScroll: false,
		input: null,
		metadata: {},
		orientation: Orientation.Horizontal,
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
		const activeFacsimilePath = facsimiles.length ? facsimiles[0].path : null

		// TODO set active textlayers

		this.setState({
			doc,
			activeFacsimilePath, 
			facsimiles,
			metadata
		})

		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		if (hasScroll) this.setState({ hasScroll })
	}
}
