interface Entry {
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	facsimileAreas: FacsimileArea[]
	id: string
	metadata: ExtractedMetadata
	notes: ExtractedNotes
	textData: ExtractedTextData
	textLayers: Layer[]
}

interface EntryState {
	activeFacsimileAreas: FacsimileArea[]
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	asideTab: AsideTab
	entry: Entry
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
						