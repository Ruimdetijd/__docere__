import * as React from 'react'
import styled from '@emotion/styled'
import { DEFAULT_SPACING, Viewport, BROWN_LIGHT } from '../constants'

interface WProps {
	active: boolean
	hasFacsimile: boolean
	small: boolean
}
const Wrapper = styled.div`
	background: #f6f6f6;
	display: grid;
	font-size: ${(props: WProps) => props.small ? '.8em' : '1em'};
	grid-column-gap: ${(props: WProps) => props.small ? DEFAULT_SPACING / 2 : DEFAULT_SPACING}px;
	grid-template-columns: ${(props: WProps) => props.hasFacsimile ?
		`${props.small ? '64px' : '128px'} auto` :
		'auto'
	};
	margin-bottom: ${(props: WProps) => props.small ? DEFAULT_SPACING / 2 : DEFAULT_SPACING}px;
	padding: ${(props: WProps) => props.small ? DEFAULT_SPACING / 2 : DEFAULT_SPACING}px;
	position: relative;
	text-decoration: none;

	&:before {
		content: '';
		position: absolute;
		width: 6px;
		top: 0;
		bottom: 0;
		background: rgba(199, 170, 113, 0);
		left: -18px;
	}

	${(props: WProps) => {
		if (props.active) {
			return `
				cursor: default;

				&:before {
					background: ${BROWN_LIGHT};
				}
			`
		} else {
			return `
				&:hover:before {
					background: rgba(199, 170, 113, .33);
				}
			`
		}
	}}
`

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
	grid-template-columns: ${(props: { small: boolean }) => props.small ?
		'28px 28px' :
		'60px 60px'
	};
	grid-gap: 8px;
`
function FacsimileThumbs(props: { facsimiles: ExtractedFacsimile[], small: boolean }) {
	if (props.facsimiles == null || !props.facsimiles.length) return null
	const thumbWidth = props.small ? 64 : 128
	return props.facsimiles.length === 1 ?
		<img src={props.facsimiles[0].path.replace('info.json', `full/${thumbWidth},/0/default.jpg`)} /> :
		<FacsimileThumbList small={props.small}>
			{
				props.facsimiles.map(facs => 
					<li key={facs.id}>
						<img src={facs.path.replace('info.json', `full/${(thumbWidth - 8)/2},/0/default.jpg`)} />
					</li>
				)
			}
		</FacsimileThumbList>
}

interface RBProps {
	activeId: string
	result: Hit
	viewport: Viewport
}
const ResultBody = (props: RBProps) =>
	<Wrapper
		active={props.result.id === props.activeId}
		hasFacsimile={props.result.hasOwnProperty('facsimiles') && props.result.facsimiles.length}
		small={props.viewport === Viewport.Results}
	>
		<FacsimileThumbs
			facsimiles={props.result.facsimiles}
			small={props.viewport === Viewport.Results}
		/>
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
	</Wrapper>

export default ResultBody
