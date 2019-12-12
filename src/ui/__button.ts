import styled from '@emotion/styled'

export default styled('div')`
	background-color: darkred;
	border-radius: 8px;
	border: none;
	box-sizing: border-box;
	color: #ffc6c6;
	cursor: pointer;
	font-size: 1.3em;
	height: 2em;
	line-height: 2em;
	margin-top: 1em;
	outline: none;
	text-align: center;
	width: 100%;
`

export const Button = styled('div')`
	border-radius: 10px;
	color: rgba(165, 42, 42, .8);
	cursor: pointer;
	font-size: 2em;
	height: 100px;
	line-height: 100px;
	margin-bottom: .5em;
	text-align: center;

	&:last-child {
		margin: 0;
	}
`