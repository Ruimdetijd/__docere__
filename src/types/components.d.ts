type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: DocereComponentProps) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: any
	config: DocereConfig
	facsimiles: ExtractedFacsimile[]
	insideNote: boolean
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setActiveId: SetActiveId
	setEntryId: AppState['setEntryId']
	textLayer: string
	viewport: Viewport
	[key: string]: any
}
