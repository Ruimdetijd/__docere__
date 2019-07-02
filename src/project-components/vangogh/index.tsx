import * as React from 'react'
import styled from '@emotion/styled'
import { rsPerson } from '../rs';
import { BROWN_DARK, Viewport } from '../../constants'

const Img = styled.img`
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: any) {
	return (
		<span onClick={props.onClick}>
			<Img src={`/api/facsimile/${props.config.slug}/${props.facs.slice(0, -4)}_files/5/0_0.jpeg`} />
		</span>
	)
}

interface NAProps { active: boolean }
const NoteAnchor = styled.span`
	background-color: ${(props: NAProps) => props.active ? BROWN_DARK : 'white' };
	border-radius: 1em;
	border: 2px solid ${BROWN_DARK};
	color: ${props => props.active ? 'white' : BROWN_DARK };
	cursor: pointer;
	display: inline-block;
	font-family: monospace;
	font-size: .8em;
	font-weight: bold;
	height: 1.2em;
	line-height: 1.2em;
	margin: 0 .25em;
	text-align: center;
	transition: all 150ms;
	width: 1.2em;
`

const getComponents: FunctionTypes['getComponents'] = function(config) {
	const personConfig = config.textdata.find(td => td.id === 'person')
	return {
		pb,
		'rs[type="pers"]': rsPerson(personConfig),
		anchor: (props: DocereComponentProps & { n: string }) => {
			console.log(props)
			return (
				<NoteAnchor
					active={props.n === props.activeId}
					onClick={() => props.setActiveId(props.n, 'editorNotes', Viewport.Notes)}
				>
					{props.n}
				</NoteAnchor>
			)
		},
	}
}

export default getComponents
