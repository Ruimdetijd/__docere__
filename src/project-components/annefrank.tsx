import { add, del, lb  } from './index'

import * as React from 'react'
import styled from '@emotion/styled'

const Img = styled.img`
	cursor: pointer;
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: any & { facs: string }) {
	if (props.extractedFacsimileData == null) return null
	const facsimile = props.extractedFacsimileData.facsimiles.find((facs: ExtractedFacsimile) => facs.id === props.facs)
	const thumbSource = facsimile.path.replace('/info.json', '/full/,32/0/default.jpg')
	
	return (
		<span onClick={() => props.setState({ facsimiles: [facsimile] })}>
			<Img src={thumbSource} />
		</span>
	)
}

const components: any = {
	lb,
	add,
	del,
	// 'rs[type="person"]': rs('green', 'id'),
	// 'rs[type="place"]': rs('red', 'id'),
	// 'rs[type="media"]': rs('blue', 'id'),
	// 'rs[type="org"]': rs('orange', 'id'),
	pb
}
export default components
