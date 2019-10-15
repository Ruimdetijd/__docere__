type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: DocereComponentProps) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: any
	config: DocereConfig
	facsimiles: Entry['facsimiles']
	insideNote: boolean
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setActiveId: SetActiveId
	setEntry: AppState['setEntry']
	textLayer: string
	viewport: Viewport
	[key: string]: any
}

interface SvgProps { active: boolean, color: string }
type RsProps = DocereComponentProps & SvgProps
