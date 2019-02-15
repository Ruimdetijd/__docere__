import * as React from 'react'
import styled from '@emotion/styled'
import { FacsThumbProps } from 'dispilio'

const Img = styled.img`
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: FacsThumbProps & { facs: string }) {
	return (
		<span onClick={() => {
			// Use the attr provided by extractedFacsimileData to retrieve the ID of the current element
			const id = props[props.extractedFacsimileData.attr]
			// With the ID find the associated path
			const facsimile = props.extractedFacsimileData.facsimiles.find(facs => facs.id === id)
			props.setState({ facsimiles: [facsimile] })
		}}
		>
			<Img src={`https://images.huygens.knaw.nl/iiif/${props.facs.slice(0, -4)}.tif/full/,32/0/native.jpg`} />
		</span>
	)
}

const components: DispilioComponents = { pb }

export default components