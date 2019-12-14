import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { TOP_OFFSET, TEXT_PANEL_WIDTH, DEFAULT_SPACING, ASIDE_WIDTH, RESULT_ASIDE_WIDTH, FOOTER_HEIGHT, FooterTab, SearchTab } from '../constants'

interface MainProps { asideTab: AsideTab, footerTab: FooterTab, searchTab: SearchTab }
export const Main = styled.div`
	bottom: ${(props: MainProps) => props.footerTab === FooterTab.PanelSelector ? `${FOOTER_HEIGHT}px` : 0};
	left: ${props => props.searchTab === SearchTab.Results ? `${RESULT_ASIDE_WIDTH}px` : 0};
	position: fixed;
	right: ${props => props.asideTab != null ? `${ASIDE_WIDTH}px` : 0};
	top: ${TOP_OFFSET}px;
	transition: all 300ms;
`

interface PWProps {
	activePanels: TextLayerConfig[]
	orientation: Orientation
}
export const PanelsWrapper = styled.div`
	display: grid;
	height: 100%;
	overflow-y: auto;
	${(p: PWProps) => {
		if (p.orientation === Orientation.Horizontal) {
			const textPanelSpace = TEXT_PANEL_WIDTH + (DEFAULT_SPACING * 6)
			let columns = p.activePanels
				.map(ap =>
					ap.type === TextLayerType.Facsimile ?
						`minmax(${DEFAULT_SPACING * 10}px, auto)` :
						`minmax(${textPanelSpace}px, auto)`
				)
				.join(' ')

			// If there is no facsimile active, the text panels should fill the available
			// space (1fr)
			if (!p.activePanels.some(ap => ap.type === TextLayerType.Facsimile)) {
				columns = p.activePanels.map(() => `minmax(${textPanelSpace}px, 1fr)`).join(' ')
			}
			return `
				grid-template-columns: ${columns};
				grid-template-rows: 100% auto;
			`
		}
		if (p.orientation === Orientation.Vertical) { 
			return `
				grid-template-columns: 100%;
				grid-template-rows: calc((100vh - ${TOP_OFFSET}px) / 2) calc((100vh - ${TOP_OFFSET}px) / 2) auto;
			`
		}
	}}
	width: 100%;
`

export const TextWrapper = styled.div`
	display: grid;
	grid-template-columns: auto ${TEXT_PANEL_WIDTH}px auto;
	height: 100%;
	overflow-y: auto;
`

export const Menu = styled.div`
	background-color: white;
	border-bottom: 1px solid #CCC;
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 64px;
	position: sticky;
	top: 0;
	z-index: 1;

	& > div {
		align-items: center;
		display: grid;
		grid-template-columns: repeat(auto-fill, 48px);
		justify-items: center;
	}

	& > div:first-of-type {
	}

	& > div:last-of-type {
		direction: rtl;
	}
`

interface TextProps {
	hasScroll: boolean
	hasLb: boolean
	hasFacs: boolean
	// wordwrap: boolean
}
export const Text = styled.div`
	color: #222;
	counter-reset: linenumber notenumber;
	font-family: serif;
	font-size: 1.25rem;
	grid-column: 2;
	line-height: 2rem;
	margin-bottom: 20vh;
	padding-top: ${DEFAULT_SPACING}px;
	padding-left: ${(props: TextProps) => props.hasFacs ? DEFAULT_SPACING * 2.5 : 0}px;
	padding-bottom: ${(props: TextProps) => props.hasScroll ? '33vh' : 0};
	position: relative;
`

export const MetadataItem = styled.li`
	margin-bottom: ${DEFAULT_SPACING}px;

	& span:first-of-type {
		color: #888;
		display: block;
		font-size: .75rem;
		margin-bottom: .25rem;
		text-transform: uppercase;
	}
`

export const small = css`
	color: #444;
	font-size: .8em;
	margin-left: .5em;
`

interface ButtonProps {
	children: any
	onClick: () => void
	title: string
}
export const SVGButton = React.memo(function(props: ButtonProps) {
	return (
		<svg
			onClick={props.onClick}
			style={{ cursor: 'pointer' }}
			viewBox="0 0 40 30"
			width="24px"
		>
			<title>{props.title}</title>
			<g fill="#444" stroke="#444">
				{props.children}
			</g>
		</svg>
	)
})
