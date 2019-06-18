import * as React from 'react'
import styled from '@emotion/styled'

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

const getComponents: FunctionTypes['getComponents'] = function(_config) {
	return {
		pb
	}
}

export default getComponents
