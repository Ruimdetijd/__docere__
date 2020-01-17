import * as React from 'react'
import styled from '@emotion/styled'
import ItemInText from './item'
import { small } from '../../index.components';
import { GRAY_LIGHT, GRAY_DARK } from '../../../constants';

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
	textdataLength: number
	height: number
}
const Ul = styled.ul`
	background: ${GRAY_DARK};
	height: ${(props: UlProps) => props.active ? `calc(${props.height}px - ${props.textdataLength * 48}px)` : 0};
	list-style: none;
	margin: 0;
	overflow: auto;
	position: relative;
	transition: height 160ms ease-out;

	${(props: UlProps) => (props.active) ? `& + h2 { box-shadow: 0px -4px 4px -4px #111; }` : ''}
`

interface AIProps {
	activeIndex: number
	color: string
}
const ActiveIndicator = styled.li`
	background: ${(props: AIProps) => props.activeIndex > -1 ? props.color : 'rgba(0, 0, 0, 0)'};
	height: 48px;
	${(props: AIProps) => props.activeIndex > -1 ? 'box-shadow: 1px 0px 8px #111' : ''};
	position: absolute;
	top: ${(props: AIProps) => props.activeIndex > -1 ? props.activeIndex * 48 : 0}px;
	transition: top 120ms ease-out;
	width: 8px;
`

interface Props {
	active: boolean
	activeItemId: string
	config: TextDataConfig
	containerHeight: number
	dispatch: React.Dispatch<EntryStateAction>
	items: Map<string, TextDataValue>
	listCount: number // Number of lists (persons, locations, etc), needed for height calculation
	listId: string
}

function TextDataList(props: Props) {
	const entries = Array.from(props.items.entries())

	const title = props.config?.title || props.listId
	const color = props.config?.color || 'black'

	const handleTitleClick = React.useCallback(() => {
		props.dispatch({ type: 'SET_ACTIVE_LIST_ID', id: props.listId })
	}, [props.listId])

	return (
		<>
			<H2
				onClick={handleTitleClick}
			>
				{title}
				<small>({props.items.size})</small>
			</H2>
			<Ul
				active={props.active}
				textdataLength={props.listCount}
				height={props.containerHeight}
			>
				<ActiveIndicator
					activeIndex={entries.findIndex(([key]) => key === props.activeItemId)}
					color={color}
				/>
				{
					entries
						.map(([key, item], i) =>
							<ItemInText
								active={key === props.activeItemId}
								item={item}
								dispatch={props.dispatch}
								id={key}
								key={key + i}
								listId={props.listId}
							/>
						)
				}
			</Ul>
		</>
	)
}

TextDataList.defaultProps = {
	items: new Map()
}

export default React.memo(TextDataList)
