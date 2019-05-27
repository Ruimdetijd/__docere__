import * as React from 'react'
import styled from '@emotion/styled'
import { small } from '../../index.components'
interface IITProps {
	active: boolean
	count: number
}
const Li = styled.li`
	color: #CCC;
	cursor: pointer;
	height: 48px;
	line-height: 48px;
	padding-left: 1em;

	&:after {
		${small}
		color: ${(props: IITProps) =>
			props.active ? '#AAA' : 'initial'
		};
		content: ${(props: IITProps) => props.count > 1 ? `"(${props.count})"` : ''};
	}
`

export default function(props: IITProps & { children: any, onClick: () => void }) {
	return <Li {...props}>
		{props.children}
	</Li>
}
