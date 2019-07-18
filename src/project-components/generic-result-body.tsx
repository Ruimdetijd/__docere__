import * as React from 'react'
import styled from '@emotion/styled'
import getResultBody, { ResultBodyProps } from './result-body'

const Label = styled.div`
	color: #888;
	font-size: .85em;
	text-transform: uppercase;
`

const ignoredKeys = ['facsimiles', 'snippets', 'text']

function MetadataItems(props: ResultBodyProps) {
	return (
		<>
			{
				Object.keys(props.result)
					.filter(key => ignoredKeys.indexOf(key) === -1)
					.map(key =>
						<div key={key}>
							<Label>{key}</Label>
							<div>{props.result[key]}</div>
						</div>
					)
			}
		</>
	)
}


export default getResultBody(MetadataItems)
