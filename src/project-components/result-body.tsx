/// <reference types="huc-faceted-search" />

import * as React from 'react'
import styled from '@emotion/styled'
import { DEFAULT_SPACING, Viewport, BROWN_LIGHT, SearchTab, MAINHEADER_HEIGHT } from '../constants'
import Tooltip from './tooltip'

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
		`${props.small ? '64px 0' : '128px auto'}` :
		'auto'
	};
	margin-bottom: ${(props: WProps) => props.small ? DEFAULT_SPACING / 2 : DEFAULT_SPACING}px;
	padding: ${(props: WProps) => props.small ? DEFAULT_SPACING / 2 : DEFAULT_SPACING}px;
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

const Metadata = styled.div`
	& > div {
		margin-bottom: 1rem;

		&:last-of-type {
			margin-bottom: 0;
		}
	}
`

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

const FacsimileThumbList = styled.ul`
	& > li:nth-of-type(odd) {
		margin-right: 8px;
	}
`

const FacsimileThumb = styled.li`
	display: inline-block;
	margin-bottom: 8px;

	& > img {
		border-radius: .15em;
	}
`

function FacsimileThumbs(props: { facsimiles: string[], small: boolean }) {
	if (props.facsimiles == null || !props.facsimiles.length) return null
	const thumbWidth = props.small ? 64 : 128
	return props.facsimiles.length === 1 ?
		<img
			src={props.facsimiles[0].replace('info.json', `full/${thumbWidth},/0/default.jpg`)}
			width={`${thumbWidth}px`}
		/> :
		<FacsimileThumbList>
			{
				props.facsimiles.map(facs => 
					<FacsimileThumb key={facs}>
						<img
							src={facs.replace('info.json', `full/${(thumbWidth - 8)/2},/0/default.jpg`)} 
							width={`${(thumbWidth - 8)/2}px`}
						/>
					</FacsimileThumb>
				)
			}
		</FacsimileThumbList>
}

// TODO there are two implementations of ResultBodyProps
export interface ResultBodyProps {
	activeId?: string
	result: Hit
	searchTab?: SearchTab
	viewport?: Viewport
}
export interface State {
	active: boolean
	tooltipTop: number
}

const getResultBody = (MetadataItems: React.FunctionComponent<ResultBodyProps>) => 
	React.memo(function ResultBody(props: ResultBodyProps) {
		const [active, setActive] = React.useState(false)
		const [tooltipTop, setTooltipTop] = React.useState(0)

		return (
			<Wrapper
				active={props.result.id === props.activeId}
				hasFacsimile={props.result.hasOwnProperty('facsimiles') && props.result.facsimiles.length > 0}
				onMouseEnter={(ev) => {
					const top = ev.currentTarget.getBoundingClientRect().top - MAINHEADER_HEIGHT - 32
					setActive(true)
					setTooltipTop(top)
				}}
				onMouseLeave={() => setActive(false)}
				small={props.viewport === Viewport.Entry}
			>
				<FacsimileThumbs
					facsimiles={props.result.facsimiles}
					small={props.viewport === Viewport.Entry}
				/>
				{
					props.viewport === Viewport.Entry && props.searchTab === SearchTab.Results ?
						<Tooltip
							orientation="right"
							style={{
								width: '360px',
								display: active ? 'block' : 'none',
								top: `${tooltipTop}px`,
							}}
							bodyStyle={{ 
								backgroundColor: '#212830',
								color: '#EEE',
							}}
							shift={.15}
						>
							<Metadata>
								<MetadataItems {...props} />
							</Metadata>
						</Tooltip> :
						<Metadata>
							<MetadataItems {...props} />
						</Metadata>
				}
				{
					props.result.snippets.length > 0 &&
					<Snippets>
						{props.result.snippets.map((snippet, index) =>
							<li dangerouslySetInnerHTML={{ __html: `...${snippet}...` }}  key={index} />
						)}
					</Snippets>
				}
			</Wrapper>
		)
	})


export default getResultBody
