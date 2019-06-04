import * as React from 'react'
import styled from '@emotion/styled'
import { ASIDE_HANDLE_WIDTH, MAINHEADER_HEIGHT, TOP_OFFSET, DEFAULT_SPACING } from './constants'

const Wrapper = styled.header`
	background: linear-gradient(to right, #988258, #c7aa71);
	display: grid;
	grid-template-rows: ${ASIDE_HANDLE_WIDTH}px ${MAINHEADER_HEIGHT}px;
	height: ${TOP_OFFSET}px;
	position: sticky;
	top: 0;
	z-index: 1001;
`

const TopMenu = styled.div`
	display: grid;
	grid-template-columns: 80% 20%;
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


export default class Header extends React.PureComponent<AppState> {
	render() {
		return (
			<Wrapper>
				<TopMenu>
					<H1
						onClick={() => this.props.setId()}
					>
						{config.title}
					</H1>
					{/* <Route
						path="/:projectSlug/:xmlId"
						render={() =>
							<div>
								<input
									onKeyUp={ev => {
										if (ev.keyCode === 13) {
											// this.state.setSearchQuery((ev.target as HTMLInputElement).value)
										}
									}}
								/>
								<div>
									<svg viewBox="0 0 250.313 250.313">
										<path d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z" />
									</svg>
								</div>
							</div>

						}
					/> */}
				</TopMenu>
			</Wrapper>
		)
	}
}
