import * as React from 'react'
import styled from '@emotion/styled'
import { rsPerson } from '../rs';

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

const getComponents: FunctionTypes['getComponents'] = function(config) {
	const personConfig = config.textdata.find(td => td.id === 'person')
	return {
		pb,
		'rs[type="pers"]': rsPerson(personConfig),
	}
}

export default getComponents
