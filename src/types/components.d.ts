type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: Partial<DocereComponentProps>) => JSX.Element>
// type GetComponents = (config: DocereConfig) => DocereComponents

interface FacsimileArea {
	h: number
	id: string
	showOnHover?: boolean
	target?: {
		id: string,
		listId: string,
		asideTab: AsideTab
	}
	unit?: 'px' | 'perc'
	w: number
	x: number
	y: number
}

type DocereComponentAction = EntryStateAction | { type: 'SET_ENTRY', id: string }

type DocereComponentProps =
	Pick<EntryState, 'activeEntity' | 'activeFacsimileAreas' | 'activeFacsimilePath' | 'activeNote'> &
	{
		attributes?: Record<string, string>
		children?: React.ReactNode
		config: DocereConfig
		dispatch: React.Dispatch<DocereComponentAction>
		facsimiles: Entry['facsimiles']
		insideNote: boolean
		textLayerId: string
	}

declare const enum RsType { Date, Location, None, Person }
interface RsProps {
	active?: boolean,
	children: React.ReactNode
	color?: string
	onClick?: (ev: any) => void
	revealOnHover?: boolean
	icon?: RsType
}


// interface HiProps extends DocereComponentProps {
// 	rend: string
// }
