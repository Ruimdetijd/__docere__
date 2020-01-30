import * as React from 'react'
import styled from '@emotion/styled'
import ResultBody, { ResultBodyProps } from './result-body'

export const Label = styled.div`
	color: #888;
	font-size: .85em;
	text-transform: uppercase;
`

const Metadata = styled.div`
	& > div {
		margin-bottom: 1rem;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
`

const ignoredKeys = ['facsimiles', 'snippets', 'text']

function GenericResultBody(props: ResultBodyProps) {
	return (
		<ResultBody {...props}>
			<Metadata>
				{
					Object.keys(props.result)
						.filter(key => ignoredKeys.indexOf(key) === -1)
						.map(key => {
							const value = props.result[key]
							return (
								<div key={key}>
									<Label>{key}</Label>
									{
										Array.isArray(value) ?
											<ul>{value.map((v, i) => <li key={i}>{v}</li>)}</ul> :
											<div>{value}</div>
									}
								</div>
							)
						})
				}
			</Metadata>
		</ResultBody>
	)
}


export default React.memo(GenericResultBody)
