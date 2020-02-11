type SetActiveId = (id: string, listId: string, asideTab: AsideTab) => void

type DocereComponents = Record<string, (props: Partial<DocereComponentProps>) => JSX.Element>
// type GetComponents = (config: DocereConfig) => DocereComponents

// TODO facsimile area is per entry, but it should be dependant on a facsimile
// TODO an entry has facsimiles with accompanying areas?
interface FacsimileArea {
	h: number
	id: string
	note?: Record<string, string>
	showOnHover?: boolean
	target?: {
		asideTab: AsideTab
		color: string,
		id: string,
		listId: string,
	}
	unit?: 'px' | 'perc'
	w: number
	x: number
	y: number
}


type DocereComponentProps =
	Pick<EntryState, 'activeEntity' | 'activeFacsimile' | 'activeFacsimileAreas' | 'activeNote'> &
	{
		appDispatch: React.Dispatch<AppStateAction>
		attributes?: Record<string, string>
		children?: React.ReactNode
		config: DocereConfig
		entryDispatch: React.Dispatch<EntryStateAction>
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

