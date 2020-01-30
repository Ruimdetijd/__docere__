interface Entry {
	doc: XMLDocument
	facsimiles: ExtractedFacsimile[]
	facsimileAreas: FacsimileArea[]
	id: string
	metadata: ExtractedMetadata
	notes: Note[]
	entities: Entity[]
	textLayers: Layer[]
}

interface EntryState {
	activeFacsimileAreas: FacsimileArea[]
	activeFacsimilePath: string
	activeEntity: Entity,
	activeNote: Note,
	asideTab: AsideTab
	entry: Entry
	footerTab: FooterTab
	layers: LayerConfig[]
}

type EntryProps = Pick<AppState, 'entry' | 'searchTab' | 'setEntry'>

type EntryAsideProps =
	Pick<EntryProps, 'entry' | 'setEntry'> &
	Pick<EntryState, 'activeEntity' | 'activeNote' | 'asideTab' | 'layers'> &
	{
		dispatch: React.Dispatch<EntryStateAction>
	}
						