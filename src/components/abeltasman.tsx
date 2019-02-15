import * as React from 'react'
import styled from '@emotion/styled'
import { FacsThumbProps } from 'dispilio';

const Img = styled.img`
	position: absolute;
	left: 0;
	width: 32px;
`
function div(props: FacsThumbProps & { facs: string, children: any }) {
	return (
		<div>
			<Img
				onClick={() => {
					// Use the attr provided by extractedFacsimileData to retrieve the ID of the current element
					const id = props[props.extractedFacsimileData.attr]
					// With the ID find the associated path
					const facsimile = props.extractedFacsimileData.facsimiles.find(facs => facs.id === id)
					props.setState({ facsimiles: [facsimile] })
				}}
				src={`/api/facsimile/abeltasman/${props.facs.slice(2)}_files/5/0_0.jpeg`}
			/>
			{props.children}
		</div>
	)
}

const components: DispilioComponents = {
	div
}

export default components