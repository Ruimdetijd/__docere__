type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: Partial<DocereComponentProps>) => JSX.Element>
type GetComponents = (config: DocereConfig) => DocereComponents

interface FacsimileArea {
	x: number
	y: number
	w: number
	h: number
	unit: 'px' | 'perc'
}

interface DocereComponentProps {
	activeFacsimilePath: EntryState['activeFacsimilePath']
	activeId: EntryState['activeId']
	activeListId: EntryState['activeListId']
	attributes?: Record<string, string>
	children?: React.ReactNode
	config: DocereConfig
	dispatch: React.Dispatch<EntryStateAction>
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
