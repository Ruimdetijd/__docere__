import * as React from 'react'
import styled from '@emotion/styled';

const Header = styled('header')`
	grid-row-start: 2;
	grid-row-end: 3;
	grid-column-start: 1;
	grid-column-end: 5;
	display: grid;
	grid-template-columns: minmax(320px, 1fr) minmax(240px, 400px) minmax(240px, 400px) minmax(320px, 1fr);

	div {
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		position: relative;

		& + div:before {
			content: '⇾';
			position: absolute;
			left: 0;
		}
	}
`

export default function MainHeader() {
	return (
		<Header>
			<div>Input</div>
			<div>Transformers</div>
			<div>Exporters</div>
			<div>Output</div>
		</Header>
	)
}