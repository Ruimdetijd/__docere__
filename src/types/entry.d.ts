interface Entry {
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	id: string
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	textData: ExtractedTextData
	textLayers: Layer[]
}

interface EntryState {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	asideTab: AsideTab
	facsimileAreas: FacsimileArea[]
	footerTab: FooterTab
	layers: LayerConfig[]
}

type EntryProps = Pick<AppState, 'configData' | 'entry' | 'searchTab' | 'setEntry'>

type EntryAsideProps =
	Pick<EntryProps, 'configData' | 'entry' | 'setEntry'> &
	Pick<EntryState, 'activeId' | 'activeListId' | 'asideTab' | 'layers'> &
	{
		entryStateDispatch: React.Dispatch<EntryStateAction>
	}
						