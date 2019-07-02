/// <reference path="../../types.d.ts" />

import * as React from 'react'
import styled from '@emotion/styled'
import 'docere-config'
import { BROWN_LIGHT, Viewport } from '../../constants'
import Rs, { rsPlace, rsPerson } from '../rs';

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

function pb(props: { activeFacsimilePath: string, facs: string, setActiveFacsimile: (a: string) => void }) {
	const baseUrl = `https://images.huygens.knaw.nl/iiif/${props.facs.slice(0, -4)}.tif`
	const active = props.activeFacsimilePath === `${baseUrl}/info.json`
	return (
		<span
			onClick={() => !active ? props.setActiveFacsimile(`${baseUrl}/info.json`) : null}
		>
			<Img
				active={active}
				src={`${baseUrl}/full/,32/0/native.jpg`}
			/>
		</span>
	)
}



const getComponents: FunctionTypes['getComponents'] = function(config) {
	const placeConfig = config.textdata.find(td => td.id === 'loc')
	const personConfig = config.textdata.find(td => td.id === 'person')

	const components: DocereComponents = {
		'ner[type="loc"]': rsPlace(placeConfig),
		'ner[type="per"]': rsPerson(personConfig),
		pb,
	}

	// Map all the text data configs to components. Person and Loc are overwritten later
	config.textdata
		.filter(td => td.id !== 'person' && td.id !== 'loc')
		.forEach(td => {
			components[td.extractor.selector] = function(props: any) {
				return (
					<Rs
						{...props}
						active={props.activeListId === td.id && props.activeId === props.children[0]}
						color={td.color}
						onClick={() => props.setActiveId(props.children[0], td.id, Viewport.TextData)}
					/>
				)
			}
		})

	return components
}

export default getComponents
