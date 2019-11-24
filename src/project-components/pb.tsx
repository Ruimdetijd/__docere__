import * as React from 'react'
import styled from '@emotion/styled'
import { BROWN_LIGHT } from '../constants';

const Img = styled.img`
	position: absolute;
	left: 0;
	margin-top: 6px;
	padding-bottom: 6px;
	width: 32px;

	${(props: { active: boolean}) => props.active ?
		`border-bottom: 6px solid ${BROWN_LIGHT};` :
		`cursor: pointer;

		&:hover {
			border-bottom: 6px solid ${BROWN_LIGHT};
		}`
	}}
`

export default function getPb(extractPbId: (props: DocereComponentProps) => string) {
	return function pb(props: DocereComponentProps) {
		const id = extractPbId(props)
		console.log(props.facsimiles, id)
		const facsimile = props.facsimiles.find(f => f.id === id)
		console.log(facsimile)
		if (facsimile == null) return null
		let src = facsimile.path[0]
		const active = props.activeFacsimilePath === src

		return (
			<span onClick={() => {
				if (!active) props.setActiveFacsimile(src)
			}}>
				<Img
					active={active}
					src={src.slice(-10) === '/info.json' ? src.replace('/info.json', '/full/,32/0/default.jpg') : src}
				/>
			</span>
		)
	}
}
