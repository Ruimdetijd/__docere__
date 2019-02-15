import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';

{/* <div style={{ fontSize: '.6em', gridColumn: '1 / span 3', color: '#444', marginTop: '1em' }}> */}
const Snippets = styled.ul`
	color: #444;
	font-size: .66em;	
	grid-column: 1 / span 3;
	margin-top: 1em;

	em {
		color: black;
		font-weight: bold;
	}
`

interface ICell {
	bold?: boolean
	small?: boolean
	right?: boolean
}
const Cell: React.SFC<ICell> = (props) =>
	<div
		style={{
			color: props.small ? '#888' : 'black',
			fontSize: props.small ? '.85em' : '1em',
			fontWeight: props.bold ? 'bold' : 'normal',
			textAlign: props.right ? 'right' : 'left'
		}}
	>
		{
			props.children == null || (typeof props.children === 'string' && !props.children.length) ? <i>Unknown</i> : props.children
		}
	</div>

const ResultBody = (slug: string) => (props: any) =>
	<Link
		to={`/projects/${slug}/xml/${props.result.m__filebasename}`}
		style={{
			display: 'grid',
			gridTemplateRows: '1fr .5fr .5fr 1fr 1fr',
			gridTemplateColumns: '4fr auto 4fr',
			textDecoration: 'none',
		}}
	>
		<Cell bold>{props.result.m_date}</Cell>
		<div/>
		<div/>
		<div style={{ gridColumn: '1 / 4' }} />
		<div style={{ borderTop: '1px solid #CCC', gridColumn: '1 / 4' }} />
		<Cell>{props.result.m_sender}</Cell>
		<div>⇒</div>
		<Cell right>{props.result.m_recipient}</Cell>
		<Cell small>{props.result.m_senderloc}</Cell>
		<div/>
		<Cell right small>{props.result.m_recipientloc}</Cell>
		<Snippets>
			{props.result.snippets.map((snippet, index) =>
				<li dangerouslySetInnerHTML={{ __html: `...${snippet}...` }}  key={index} />
			)}
		</Snippets>
		{/* <div style={{ fontSize: '.6em', gridColumn: '1 / span 3', color: '#444', marginTop: '1em' }}>
			{props.result.text.slice(0, 140)}
			{props.result.text.length > 140 ? '...' : ''}
		</div> */}
	</Link>

export default ResultBody