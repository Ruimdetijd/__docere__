import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { COLOR_ATTRIBUTE_NAME } from './index'

export const Main = styled('div')`
	box-sizing: border-box;
	display: grid;
	grid-column-gap: 2%;
	grid-template-rows: 10% 87%;
	grid-template-columns: 20% 56% 20%;
	height: 100%;
	padding: 0 2%;
	transition: all 1s;
	width: 100%;
`

export const H1 = styled('h1')`
	grid-column-start: 1;
	grid-column-end: 5;
    margin: 0;
    justify-self: center;
    background: rgba(255, 255, 255, .8);
    align-self: start;
    padding: 0.2em 1.4em;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
	box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
	text-align: center;
	
	small {
		color: #888;
		font-weight: normal;
		font-size: .375em;
		display: block;
		text-transform: uppercase;
	}
`

export const MetadataItem = styled.li`
	margin-bottom: .5em;

	& span:first-of-type {
		display: block;
		font-weight: bold;
	}
`

export const small = css`
		color: #444;
		font-size: .8em;
		margin-left: .5em;
`

interface IITProps {
	active: boolean
	count: number
	node: DataNode
}
export const ItemInText = styled.li`
	background-color: ${(props: IITProps) =>
		props.active ? props.node.attributes[COLOR_ATTRIBUTE_NAME] : 'initial'
	};
	cursor: pointer;

	&:after {
		${small}
		content: ${(props: IITProps) => props.count > 1 ? `"(${props.count})"` : ''};
	}
`