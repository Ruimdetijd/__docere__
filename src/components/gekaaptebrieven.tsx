import * as React from 'react'
import styled from '@emotion/styled'
import { FacsThumbProps } from 'dispilio'
import 'docere-config'
import { rs } from '.';

const Img = styled.img`
	cursor: pointer;
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: FacsThumbProps & { facs: string }) {
	return (
		<span
			onClick={() => {
				console.log(props)
				// // Use the attr provided by extractedFacsimileData to retrieve the ID of the current element
				// const id = props[props.extractedFacsimileData.attr]
				// // With the ID find the associated path
				// const facsimile = props.extractedFacsimileData.facsimiles.find(facs => facs.id === id)
				// props.setState({ facsimiles: [facsimile] })
			}}
		>
			<Img src={`https://images.huygens.knaw.nl/iiif/${props.facs.slice(0, -4)}.tif/full/,32/0/native.jpg`} />
		</span>
	)
}

const components: DispilioComponents = {
	pb,
}

const extractorColors = {
	person: 'red',
	org: 'green',
	loc: 'orange',
	misc: 'blue',
}
config.textdata.forEach(td => {
	const Rs = rs(extractorColors[td.id], td.extractor.idAttribute)
	components[td.extractor.selector] = function(props) {
		return <Rs {...props} onClick={() => props.setActiveId(props.id)} />
	}
})

export default components
