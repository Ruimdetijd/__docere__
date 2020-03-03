interface Entry {
	doc: XMLDocument
	facsimiles: Facsimile[]
	id: string
	metadata: Metadata
	notes: Note[]
	entities: Entity[]
	layers: Layer[]
}

interface EntryState {
	activeFacsimileAreas: FacsimileArea[]
	activeFacsimile: Facsimile
	activeEntity: Entity,
	activeNote: Note,
	asideTab: AsideTab
	entry: Entry
	footerTab: FooterTab
	layers: Layer[]
}

type EntryProps = Pick<AppState, 'entry' | 'searchQuery' | 'searchTab'> & { appDispatch: React.Dispatch<AppStateAction> }

type EntryAsideProps =
	Pick<EntryProps, 'appDispatch' | 'entry'> &
	Pick<EntryState, 'activeEntity' | 'activeFacsimile' | 'activeFacsimileAreas' | 'activeNote' | 'asideTab' | 'layers'> &
	{
		entryDispatch: React.Dispatch<EntryStateAction>
	}
						