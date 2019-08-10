import * as React from 'react'
import styled from '@emotion/styled'

interface P {
	active: boolean
}
const Li = styled.li`
	color: ${(props: P) => props.active ? '#FFF' : '#BBB' };
	cursor: pointer;
	display: grid;
	grid-template-columns: 1fr 9fr;
	line-height: 1.6rem;
	margin-bottom: 1em;
	padding: 0 1em 0 calc(16px + 1em);
	position: relative;
`

// TODO if active scrollIntoView()
export default function Note(props: P & { children: any, onClick: () => void }) {
	return <Li {...props}>
		{props.children}
	</Li>
}
