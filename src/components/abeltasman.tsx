import * as React from 'react'
import styled from '@emotion/styled'

const Img = styled.img`
	position: absolute;
	left: 0;
	width: 32px;
`
function div(props: any) {
	return (
		<div>
			<Img src={`/api/facsimile/abeltasman/${props.facs.slice(2)}_files/5/0_0.jpeg`} />
			{props.children}
		</div>
	)
}

const components: DispilioComponents = {
	div
}

export default components