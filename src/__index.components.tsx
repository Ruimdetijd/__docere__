import styled from '@emotion/styled'
import { css } from '@emotion/core'

const TOPMENU_HEIGHT = 32
const MAINHEADER_HEIGHT = 64 

export const Main = styled('div')`
	background-color: white;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: 32px 64px auto;
	width: 100%;
`

interface LayersProps {
	orientation: Orientation
}
export const Layers = styled.div`
	display: grid;
	${(props: LayersProps) => {
		console.log(props)
		if (props.orientation === 0) return 'grid-template-columns: 1fr 1fr;'
		if (props.orientation === 1) return 'grid-template-rows: 1fr 1fr;'

	}}
`

export const H1 = styled('h1')`
	align-items: center;	
	background: #e3c386;
	color: #444;
	display: grid;
	font-size: 1.75rem;
	height: ${MAINHEADER_HEIGHT}px;
	justify-items: center;
	margin: 0;
	position: sticky;
	top: ${TOPMENU_HEIGHT}px;
	text-transform: uppercase;
	z-index: 1;

	a:hover, a:link, a:active, a:visited {
		color: inherit;
		text-decoration: none;
	}

	div {
		text-align: center;
	}

	small {
		color: #888;
		font-weight: normal;
		font-size: .375em;
		display: block;
	}
`

export const Menu = styled.div`
	background-color: #c7aa71;
	display: grid;
	grid-template-columns: 80% 20%;
	height: ${TOPMENU_HEIGHT}px;
	position: sticky;
	top: 0;
	z-index: 1;

	& > div {
		display: grid;
		grid-template-columns: 64px auto 28px 32px;

		& > input { 
			background-color: #988258;
			border: none;
			box-sizing: border-box;
			color: white;
			font-size: 1rem;
			grid-column: 2;
			outline: none;
			padding: 0 .5em;
			width: 100%;
		}
		& > div {
			align-items: center;
			background-color: #988258;
			grid-column: 3;
			padding-right: 8px;
			display: grid;

			svg {
				fill: #c7aa71;
			}
		}
	}
`

export const MetadataItem = styled.li`
	margin-bottom: .5em;

	& span:first-of-type {
		display: block;
		font-weight: bold;
	}
`

export const small = css`
	color: #444;
	font-size: .8em;
	margin-left: .5em;
`

// export const H1 = styled('h1')`
// 	grid-column-start: 1;
//     margin: 0;
//     justify-self: center;
//     background: rgba(255, 255, 255, .8);
//     align-self: start;
//     padding: 0.2em 1.4em;
//     border-bottom-left-radius: 1em;
//     border-bottom-right-radius: 1em;
// 	box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
// 	text-align: center;
	
// 	small {
// 		color: #888;
// 		font-weight: normal;
// 		font-size: .375em;
// 		display: block;
// 		text-transform: uppercase;
// 	}
// `
