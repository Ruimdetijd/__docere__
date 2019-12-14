type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: Partial<DocereComponentProps>) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface FacsimileHighlightOptions {
	x: number
	y: number
	w: number
	h: number
	unit: 'px' | 'perc'
}

interface DocereComponentProps {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	children?: React.ReactNode
	config: DocereConfig
	facsimiles: Entry['facsimiles']
	insideNote: boolean
	setActiveFacsimile: (activeFacsimilePath: string) => void
	setFacsimileHighlight: (settings: FacsimileHighlightOptions) => void
	setActiveId: SetActiveId
	setEntry: AppState['setEntry']
	// TODO change to textLayerId
	textLayer: string
	viewport: Viewport
	[key: string]: any
}

interface SvgProps { active: boolean, color: string }
type RsProps = DocereComponentProps & SvgProps


interface HiProps extends DocereComponentProps {
	rend: string
}
