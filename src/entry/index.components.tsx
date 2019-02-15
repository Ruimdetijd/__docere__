import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const Main = styled('div')`
	box-sizing: border-box;
	display: grid;
	grid-row-gap: 1%;
	grid-template-rows: 10% 3% 85%;
	height: 100%;
	padding: 0 2%;
	transition: all 1s;
	width: 100%;
`

interface LayersProps {
	orientation: Orientation
}
export const Layers = styled.div`
	display: grid;
	grid-column-gap: 2%;
	${(props: LayersProps) => {
		console.log(props)
		if (props.orientation === 0) return 'grid-template-columns: 1fr 1fr;'
		if (props.orientation === 1) return 'grid-template-rows: 1fr 1fr;'

	}}
`

export const H1 = styled('h1')`
	align-items: center;	
	background: #333;
	color: #DDD;
	display: grid;
	justify-items: center;
	margin: 0;
	text-transform: uppercase;

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
