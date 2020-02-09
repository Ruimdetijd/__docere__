import * as React from 'react'
import styled from '@emotion/styled'
import { ASIDE_HANDLE_WIDTH, MAINHEADER_HEIGHT, TOP_OFFSET, DEFAULT_SPACING } from '../constants'
import PagesMenu from './pages'
import AppContext from '../app/context'

const Wrapper = styled.header`
	background: linear-gradient(to right, #988258, #c7aa71);
	display: grid;
	grid-template-rows: ${ASIDE_HANDLE_WIDTH}px ${MAINHEADER_HEIGHT}px;
	height: ${TOP_OFFSET}px;
	position: sticky;
	top: 0;
	z-index: 9999;
`

const TopMenu = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	height: ${DEFAULT_SPACING}px;
	padding: 0 ${DEFAULT_SPACING}px;

	& > div {
		display: grid;
		grid-template-columns: 64px auto 28px;

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

const H1 = styled('h1')`
	cursor: pointer;
	font-size: 1.1em;
	margin: 0;
	text-transform: uppercase;
	align-self: center;
    font-style: italic;
    color: #c7aa71;
    text-shadow: 1px 1px 5px #404040;
    letter-spacing: .05em; uppercase;

	a:hover, a:link, a:active, a:visited {
		color: inherit;
		text-decoration: none;
	}
`


interface Props {
	appDispatch: React.Dispatch<AppStateAction>
}
export default React.memo(function Header(props: Props) {
	const appContext = React.useContext(AppContext)
	const setSearchTab = React.useCallback(() =>
		props.appDispatch({ type: 'SET_VIEWPORT', viewport: Viewport.EntrySelector }),
	[])

	return (
		<Wrapper>
			<TopMenu>
				<H1
					onClick={setSearchTab}
				>
					{appContext.config.title}
				</H1>
				<PagesMenu
					appDispatch={props.appDispatch}
				/>
			</TopMenu>
		</Wrapper>
	)
})
