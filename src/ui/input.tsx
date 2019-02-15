import * as React from 'react'
import styled from '@emotion/styled'
import HireInput from 'hire-forms-input'

const InputWrapper = styled.div`
	background: white;
	border: 1px solid #CCC;
	border-radius: .4em;
	box-sizing: border-box;
	color: #2196f3;
	font-size: .8em;
	list-style: none;
	margin-bottom: .5em;
	text-transform: uppercase;
	padding: .5em;

	input {
		border: none;
		box-sizing: border-box;
		font-size: 1.6em;
		outline: none;
		width: 100%;
	}
`

interface Props extends DisabledProps {
	change: (value: string) => void
}
export default function Input(props: Props) {
	return (
		<InputWrapper>
			<label>{props.label}</label>
			<HireInput
				onChange={props.change}
				value={props.value}
			/>
		</InputWrapper>
	)
}

interface DisabledProps {
	label: string
	value: string
}
export function DisabledInput(props: DisabledProps) {
	return (
		<InputWrapper>
			<label>{props.label}</label>
			{props.value}
		</InputWrapper>
	)
}