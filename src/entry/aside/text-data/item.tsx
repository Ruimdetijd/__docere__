import * as React from 'react'
import styled from '@emotion/styled'
import { small } from '../../index.components'

const Li = styled.li`
	color: #CCC;
	cursor: pointer;
	height: 48px;
	line-height: 48px;
	padding-left: 1em;

	&:after {
		${small}
		color: #777;
		content: ${(props: { count: number }) => props.count > 1 ? `"(${props.count})"` : ''};
	}
`

interface Props {
	active: boolean
	dispatch: React.Dispatch<EntryStateAction>
	id: EntryState['activeId']
	item: TextDataValue
	listId: EntryState['activeListId']
}
export default function ItemInText(props: Props) {
	const handleClick = React.useCallback(() => {
		props.dispatch({ type: 'SET_TEXT_DATA_ID', activeId: props.id, activeListId: props.listId })
	}, [props.id, props.listId])

	return (
		<Li
			count={props.item.count}
			onClick={handleClick}
		>
			{props.item.value}
		</Li>
	)
}
