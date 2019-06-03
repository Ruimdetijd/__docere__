import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import { DEFAULT_SPACING } from '../constants';

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

const FacsimileThumbList = styled.ul`
	display: grid;
	grid-template-columns: 60px 60px;
	grid-gap: 8px;
`
function FacsimileThumbs(props: { facsimiles: ExtractedFacsimile[] }) {
	if (props.facsimiles == null || !props.facsimiles.length) return null
	return props.facsimiles.length === 1 ?
		<img src={props.facsimiles[0].path.replace('info.json', 'full/128,/0/default.jpg')} /> :
		<FacsimileThumbList>
			{
				props.facsimiles.map(facs => 
					<li key={facs.id}>
						<img src={facs.path.replace('info.json', 'full/60,/0/default.jpg')} />
					</li>
				)
			}
		</FacsimileThumbList>
}

const ResultBody = (slug: string) => (props: any) =>
	<Link
		to={`/${slug}/${props.result.id}`}
		style={{
			background: '#f6f6f6',
			display: 'grid',
			gridColumnGap: `${DEFAULT_SPACING}px`,
			gridTemplateColumns: props.result.hasOwnProperty('facsimiles') && props.result.facsimiles.length ? '128px auto' : 'auto',
			marginBottom: `${DEFAULT_SPACING}px`,
			padding: `${DEFAULT_SPACING}px`,
			textDecoration: 'none',
		}}
	>
		<FacsimileThumbs facsimiles={props.result.facsimiles} />
		<div style={{
			display: 'grid',
			gridTemplateRows: '1fr .5fr .5fr 1fr 1fr',
			gridTemplateColumns: '4fr auto 4fr',
		}}>
			<Cell bold>{props.result.date}</Cell>
			<div/>
			<div/>
			<div style={{ gridColumn: '1 / 4' }} />
			<div style={{ borderTop: '1px solid #CCC', gridColumn: '1 / 4' }} />
			<Cell>{props.result.sender}</Cell>
			<div>⇒</div>
			<Cell right>{props.result.recipient}</Cell>
			<Cell small>{props.result.senderloc}</Cell>
			<div/>
			<Cell right small>{props.result.recipientloc}</Cell>
			<Snippets>
				{props.result.snippets.map((snippet, index) =>
					<li dangerouslySetInnerHTML={{ __html: `...${snippet}...` }}  key={index} />
				)}
			</Snippets>
		</div>
	</Link>

export default ResultBody
