import * as React from 'react'
import styled from '@emotion/styled'
import DocereTextView from 'docere-text-view';
import { BROWN_LIGHT } from '../../../constants';

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

interface Props {
	active: boolean
	components: DocereComponents
	dispatch: React.Dispatch<EntryStateAction>
	item: Note
	listId: string
	setEntry: AppState['setEntry']
}
export default function Note(props: Props) {
	const handleClick = React.useCallback(() => {
		props.dispatch({ type: 'SET_NOTE', id: props.item.n.toString() })
	}, [props.item, props.listId])

	return (
		<Li
			active={props.active}
			onClick={handleClick}
		>
			<div>{props.item.n}</div>
			<div>
				<DocereTextView
					components={props.components}
					customProps={{
						insideNote: true,
						setEntry: props.setEntry,
					}}
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
