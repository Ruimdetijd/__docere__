import { add, del, lb, rs } from './index'

import * as React from 'react'
import styled from '@emotion/styled'
import { FacsThumbProps } from 'dispilio'

const Img = styled.img`
	cursor: pointer;
	position: absolute;
	left: 0;
	width: 32px;
`
function pb(props: FacsThumbProps & { facs: string }) {
	if (props.extractedFacsimileData == null) return null
	const facsimile = props.extractedFacsimileData.facsimiles.find(facs => facs.id === props.facs)
	const thumbSource = facsimile.path.replace('/info.json', '/full/,32/0/default.jpg')
	
	return (
		<span onClick={() => props.setState({ facsimiles: [facsimile] })}>
			<Img src={thumbSource} />
		</span>
	)
}

const components: DispilioComponents = {
	lb,
	add,
	del,
	'rs[type="person"]': rs('green', 'id'),
	'rs[type="place"]': rs('red', 'id'),
	'rs[type="media"]': rs('blue', 'id'),
	'rs[type="org"]': rs('orange', 'id'),
	pb
}
export default components
