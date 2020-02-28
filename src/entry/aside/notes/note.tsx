import * as React from 'react'
import styled from '@emotion/styled'
import DocereTextView from 'docere-text-view'
import { BROWN_LIGHT } from '../../../constants'
import AppContext from '../../../app/context'

const Li = styled.li`
	color: ${(props: { active: boolean }) => props.active ? '#FFF' : '#BBB' };
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr 9fr;
	line-height: 1.6rem;
	margin-bottom: 1em;
	padding: 0 1em 0 calc(16px + 1em);
	position: relative;
`

interface AIProps {
	active: boolean
	color: string
}
const ActiveIndicator = styled.div`
	background: ${(props: AIProps) => props.active ? props.color : 'rgba(0, 0, 0, 0)'};
	height: ${props => props.active ? '100%' : 0};
	left: 8px;
	position: absolute;
	top: 0;
	transition: top 120ms ease-out;
	width: 8px;
`

type Props = Pick<EntryState, 'activeEntity' | 'activeFacsimile' | 'activeFacsimileAreas' | 'activeNote'> & {
	active: boolean
	appDispatch: React.Dispatch<AppStateAction>
	components: DocereComponents
	entry: Entry
	entryDispatch: React.Dispatch<EntryStateAction>
	item: Note
	listId: string
}
export default function Note(props: Props) {
	const appContext = React.useContext(AppContext)
	const handleClick = React.useCallback(() => {
		props.entryDispatch({ type: 'SET_NOTE', id: props.item.id })
	}, [props.item, props.listId])

	const customProps: DocereComponentProps = {
		activeFacsimileAreas: props.activeFacsimileAreas,
		activeFacsimile: props.activeFacsimile,
		activeEntity: props.activeEntity,
		activeNote: props.activeNote,
		appDispatch: props.appDispatch,
		components: props.components,
		config: appContext.config,
		entry: props.entry,
		entryDispatch: props.entryDispatch,
		insideNote: false,
		textLayerId: null
	}

	return (
		<Li
			active={props.active}
			onClick={handleClick}
		>
			<div>{props.item.targetId}</div>
			<div>
				<DocereTextView
					components={props.components}
					customProps={customProps}
					node={props.item.el}
				/>
			</div>
			<ActiveIndicator
				active={props.active}
				color={BROWN_LIGHT}
			/>
		</Li>
	)
}
