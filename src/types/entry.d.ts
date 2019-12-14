interface Entry {
	id: string
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	textData: ExtractedTextData
	textLayers: TextLayer[]
}

interface EntryState {
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
}

type EntryProps = Pick<AppState, 'configData' | 'entry' | 'searchQuery' | 'searchTab' | 'setEntry' | 'viewport'>

type EntryAsideProps =	Pick<EntryProps, 'configData' | 'entry' | 'setEntry'> &
						Pick<EntryState, 'activeId' | 'activeListId' | 'activePanels' | 'asideTab' | 'setAsideTab'> &
						{ setActiveId: SetActiveId }
						