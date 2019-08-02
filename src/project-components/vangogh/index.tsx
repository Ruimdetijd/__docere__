/// <reference path="../../types.d.ts" />

import * as React from 'react'
import styled from '@emotion/styled'
import { rsPerson } from '../rs';
import { BROWN_DARK, AsideTab } from '../../constants'

const Img = styled.img`
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: DocereComponentProps & { facs: string }) {
	const facsimile = props.facsimiles.find(f => f.id === props.facs.slice(1))
	if (facsimile == null) return null
	return (
		<span onClick={() => props.setActiveFacsimile(facsimile.path[0])}>
			<Img src={facsimile.path[0]} />
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
	font-size: .8rem;
	font-weight: bold;
	height: 1.4em;
	line-height: 1.4em;
	margin: 0 .25em;
	text-align: center;
	transition: all 150ms;
	width: 1.6em;
`

const Ref = styled.span`border-bottom: 1px solid green;`
const ref = function(props: DocereComponentProps & { target: string }) {
	return (
		<Ref
			onClick={(ev: React.MouseEvent<HTMLSpanElement>) => {
				ev.stopPropagation()
				props.setEntryId(props.target.slice(0, -4))
			}}
		>
			{props.children}
		</Ref>
	)
}

const getComponents: GetComponents = function(config) {
	const personConfig = config.textdata.find(td => td.id === 'person')
	return {
		ref,
		pb,
		'rs[type="pers"]': rsPerson(personConfig),
		anchor: (props: DocereComponentProps & { n: string }) => {
			return (
				<NoteAnchor
					active={props.n === props.activeId}
					onClick={() => props.setActiveId(props.n, 'editorNotes', AsideTab.Notes)}
				>
					{props.n}
				</NoteAnchor>
			)
		},
	}
}

export default getComponents
