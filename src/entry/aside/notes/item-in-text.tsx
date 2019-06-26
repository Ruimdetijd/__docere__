import * as React from 'react'
import styled from '@emotion/styled'

interface IITProps {
	active: boolean
}
const Li = styled.li`
	color: #CCC;
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr 9fr;
	line-height: 1.6rem;
	margin-bottom: 1em;
	padding: 0 1em 0 calc(16px + 1em);
	position: relative;
`

export default function Note(props: IITProps & { children: any, onClick: () => void }) {
	return <Li {...props}>
		{props.children}
	</Li>
}
