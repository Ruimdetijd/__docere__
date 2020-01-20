type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: Partial<DocereComponentProps>) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface FacsimileArea {
	h: number
	id: string
	showOnHover?: boolean
	target?: Pick<EntryState, 'activeId' | 'activeListId' | 'asideTab'>
	unit?: 'px' | 'perc'
	w: number
	x: number
	y: number
}

type DocereComponentAction = EntryStateAction | { type: 'SET_ENTRY', id: string }

interface DocereComponentProps {
	activeFacsimileAreas: EntryState['activeFacsimileAreas']
	activeFacsimilePath: EntryState['activeFacsimilePath']
	activeId: EntryState['activeId']
	activeListId: EntryState['activeListId']
	attributes?: Record<string, string>
	children?: React.ReactNode
	config: DocereConfig
	dispatch: React.Dispatch<DocereComponentAction>
	facsimiles: Entry['facsimiles']
	insideNote: boolean
	textLayerId: string
}

interface SvgProps {
	active: boolean,
	color: string
	onClick?: (ev: any) => void
}
type RsProps = DocereComponentProps & SvgProps


interface HiProps extends DocereComponentProps {
	rend: string
}
