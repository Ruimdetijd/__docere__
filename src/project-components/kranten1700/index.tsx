import * as React from 'react'
import styled from '@emotion/styled'
import { AsideTab } from '../../constants';

const W = styled.span`
	cursor: pointer;
	position: relative;

	&:hover {
		border-bottom: 3px solid ${props => colorByType[props.type] || '#222'};

		& > div {
			display: block;
		}
	}

	${(props: { active: boolean, type: string }) => props.active ?
		`background: ${colorByType[props.type] || '#222'}; color: white;` :
		''
	}
`

const Tooltip = styled.div`
	background: #222;
	border-radius: .2em;
	color: white;
	display: none;
	left: -150px;
	padding: 1em;
	position: absolute;
	top: 2em;
	width: 300px;
	z-index: 1;

	&:after {
		border-color: transparent transparent #222 transparent;
		border-style: solid;
		border-width: 10px;
		content: '';
		height: 0;
		left: calc(50% - 10px);
		position: absolute;
		top: -20px;
		width: 0;
	}
`

const colorByType: Record<string, string> = {
	per: 'orange',
	org: '#5fb53f',
	misc: 'lightblue',
	loc: '#8080ff',
}

const Rs = styled.span`
	background-color: ${(props: { active: boolean }) => {
		return props.active ? '#fd7a7a' : 'rgba(0, 0, 0, 0)'
	}};
	color: ${props => props.active ? 'white' : 'inherit'};
	cursor: pointer;
	transition: all 300ms;
`

const Dl = styled.dl`
	line-height: 1rem;
	margin: 0;

	& > div {
		margin-bottom: 1rem;
	}

	dt {
		color: #888;
		font-size: .66rem;
		text-transform: uppercase;
	}

	dt, dd {
		margin: 0;
		padding: 0;
	}

	dd {
		font-size: 1rem;
	}
`

interface WProps {
	'xml:id': string
	contemporary: string
	pos: string
	possub: string
	type: string
	value: string
}
function w(props: DocereComponentProps & WProps) {
	return (
		<Rs
			active={props.pos === props.activeId}
		>
			<W
				active={props['xml:id'] === props.activeId}
				onClick={() => {
					if (props.type) props.setActiveId(props['xml:id'], props.type, AsideTab.TextData)
					else props.setActiveId(props['xml:id'], null, null)
				}}
				type={props.type}
			>
				{ props.textLayer === 'Origineel' ? props.value : props.contemporary }
				<Tooltip>
					<Dl>
						<div>
							<dt>Origineel</dt>
							<dd>{props.value}</dd>
						</div>
						<div>
							<dt>Contemporain</dt>
							<dd>{props.contemporary}</dd>
						</div>
						<div>
							<dt>pos</dt>
							<dd>{props.pos}</dd>
						</div>
						<div>
							<dt>pos sub</dt>
							<dd>{props.possub}</dd>
						</div>
						{
							props.type &&
							<div>
								<dt>NER type</dt>
								<dd>{props.type}</dd>
							</div>
						}
					</Dl>
				</Tooltip>
			</W>
		</Rs>
	)
}

// function t(props: any) {
// 	if (
// 		(props.textLayer === 'Contemporain' && props.hasOwnProperty('_class') && props._class === 'contemporary') ||
// 		(props.textLayer === 'Origineel' && !props.hasOwnProperty('_class'))
// 	) {
// 		return (
// 			<span>
// 				{props.children}
// 			</span>
// 		)
// 	}

// 	return null
// }


const getComponents: GetComponents = function(_config) {
	const components: DocereComponents = {
		w,
		s: styled.div`
			margin-bottom: 1em;
		`,
		p: styled.div`
			margin-bottom: 1em;
		`,
	}
	return components
}

export default getComponents
