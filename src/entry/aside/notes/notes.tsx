import * as React from 'react'
import styled from '@emotion/styled'
import Note from './note'
import { small } from '../../index.components';
import { GRAY_LIGHT, GRAY_DARK } from '../../../constants'

const H2 = styled.h2`
	background: ${GRAY_LIGHT};
    box-shadow: 0px 4px 4px -4px #111;
	color: #EEE;
	cursor: pointer;
	font-size: 1em;
	font-weight: normal;
	height: 48px;
	line-height: 48px;
	margin: 0;
	padding-left: 1em;
	position: relative;
    z-index: 1;

	&:after {
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid ${GRAY_LIGHT};
		content: '';
		height: 0;
		position: absolute;
		right: 24px;
		top: 48px;
		width: 0;
		z-index: 1;
	}

	& small {
		${small}
		color: #AAA;
	}
`

interface UlProps {
	active: boolean
	listCount: number
	height: number
}
const Ul = styled.ul`
	background: ${GRAY_DARK};
	box-sizing: border-box;
	height: ${(props: UlProps) => props.active ? `calc(${props.height}px - ${props.listCount * 48}px)` : 0};
	list-style: none;
	margin: 0;
	overflow: auto;
	padding: ${(props: UlProps) => props.active ? `2em 0` : 0};
	position: relative;
	transition: height 160ms ease-out;

	${(props: UlProps) => (props.active) ? `& + h2 { box-shadow: 0px -4px 4px -4px #111; }` : ''}
`

interface Props {
	active: boolean
	activeItemId: string
	components: DocereComponents
	config: DocereConfig
	containerHeight: number
	dispatch: React.Dispatch<EntryStateAction>
	itemConfig: any
	items: Entry['notes']
	itemsConfig: any[]
	setEntry: AppState['setEntry']
}

function Notes(props: Props) {
	const handleTitleClick = React.useCallback(() => {
		props.dispatch({ type: 'SET_ACTIVE_LIST_ID', activeListId: props.itemConfig.id })
	}, [props.itemConfig.id])

	return (
		<>
			<H2
				onClick={handleTitleClick}
			>
				{props.itemConfig.title}
				<small>({props.items.length})</small>
			</H2>
			<Ul
				active={props.active}
				listCount={props.itemsConfig.length}
				height={props.containerHeight}
			>
				{
					props.items[props.itemConfig.id]
						.map((item, i) =>
							<Note
								active={item.n === props.activeItemId}
								components={props.components}
								dispatch={props.dispatch}
								item={item}
								key={i}
								listId={props.itemConfig.id}
								setEntry={props.setEntry}
							/>
						)
				}
			</Ul>
		</>
	)
}

export default React.memo(Notes)
