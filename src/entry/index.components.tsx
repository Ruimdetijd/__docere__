import * as React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

// const COLOR_ATTRIBUTE_NAME = '__color'
const TOP_OFFSET = '96px';

interface MainProps { asideVisible: boolean }
export const Main = styled.div`
	display: grid;
	grid-template-columns: ${(props: MainProps) => props.asideVisible ? '70% 30%' : 'auto 64px'};
`

interface LayersProps {
	orientation: Orientation
}
export const Layers = styled.div`
	display: grid;
	${(props: LayersProps) => {
		// Yes, I know props.orientation ? 'columns' : 'rows' would be sufficient here,
		// but this is clearer
		if (props.orientation === Orientation.Horizontal) {
			return `
				grid-template-columns: auto 576px;
				grid-template-rows: 100% auto;
			`
		}
		if (props.orientation === Orientation.Vertical) { 
			return `
				grid-template-columns: 100%;
				grid-template-rows: calc((100vh - ${TOP_OFFSET}) / 2) calc((100vh - ${TOP_OFFSET}) / 2) auto;
			`
		}
	}}
`

export const TextWrapper = styled.div`
	display: grid;
	grid-column: ${(props: LayersProps) => props.orientation === Orientation.Horizontal ? 2 : 1};
	grid-row: ${(props: LayersProps) => props.orientation === Orientation.Horizontal ? '1 / span 2' : '1 / span 3'};
	grid-template-rows: 64px auto;
	${(props: LayersProps) =>
		props.orientation === Orientation.Horizontal ?
			`padding: 0 32px 0 64px;` :
			`padding-bottom: calc((100vh - ${TOP_OFFSET}) / 2)`	
	}
`

export const Menu = styled.div`
	background-color: white;
	border-bottom: 1px solid #CCC;
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 64px;
	position: sticky;
	top: ${TOP_OFFSET};
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
	hasLb: boolean
	hasFacs: boolean
	wordwrap: boolean
}
export const Text = styled.div`
	color: #222;
	counter-reset: linenumber notenumber;
	font-family: 'Merriweather', serif;
	font-size: 1.1rem;
	grid-column: 2;
	line-height: 2rem;
	padding-top: 32px;
	padding-left: ${(props: TextProps) => {
		let paddingLeft = 0;
		// The facsthumb is 32px wide and get 16px extra space
		if (props.hasFacs) paddingLeft += 48 

		// The linenumber gets 42 px, so check if the facsthumb is already adding 16px extra space
		if (props.wordwrap && props.hasLb) {
			paddingLeft += props.hasFacs ? 26 : 42 
		}
		return `${paddingLeft}px`
	}};
	padding-bottom: 33vh;
	position: relative;
`

export const MetadataItem = styled.li`
	margin-bottom: 1em;

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
export const SVGButton = function(props: ButtonProps) {
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
}

interface OBProps {
	orientation: Orientation
	onClick: () => void
}
export const OrientationButton = function(props: OBProps) {
	return (
		<SVGButton
			onClick={props.onClick}
			title={`Switch to ${props.orientation === Orientation.Horizontal ? 'vertical' : 'horizontal' } layout`}
		>
			<rect width="40" height="30" fill="white" stroke="#444" />
			<rect width="40" height="8" />
			{
				props.orientation === Orientation.Horizontal ?
					<rect width="40" height="4" y="16" /> :
					<rect width="4" height="30" x="18" />
			}
		</SVGButton>
	)
}

interface WWProps {
	wordwrap: boolean
	onClick: () => void
}
export const WordWrapButton = function(props: WWProps) {
	return (
		<SVGButton
			onClick={props.onClick}
			title={`${props.wordwrap ? 'Disable' : 'Enable'} wordwrap`}
		>
			<polygon points="4,18 20,9 20,27" />
			<line x1="20" y1="18" x2="32" y2="18" strokeWidth="6" />
			<line x1="32" y1="21" x2="32" y2="4" strokeWidth="6" />
		</SVGButton>
	)
}
