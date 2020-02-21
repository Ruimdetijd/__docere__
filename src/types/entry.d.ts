interface Entry {
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	id: string
	metadata: ExtractedMetadata
	notes: Note[]
	entities: Entity[]
	layers: Layer[]
}

interface EntryState {
	activeFacsimileAreas: FacsimileArea[]
	activeFacsimile: ExtractedFacsimile
	activeEntity: Entity,
	activeNote: Note,
	asideTab: AsideTab
	entry: Entry
	footerTab: FooterTab
	layers: LayerConfig[]
}

type EntryProps = Pick<AppState, 'entry' | 'searchQuery' | 'searchTab'> & { appDispatch: React.Dispatch<AppStateAction> }

type EntryAsideProps =
	Pick<EntryProps, 'appDispatch' | 'entry'> &
	Pick<EntryState, 'activeEntity' | 'activeNote' | 'asideTab' | 'layers'> &
	{
		entryDispatch: React.Dispatch<EntryStateAction>
	}
						