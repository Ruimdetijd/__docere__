import * as React from 'react'
import styled from '@emotion/styled';

const Wrapper = styled.div`
	align-self: center;
	background: #EEE;
	border-radius: 32px;
	box-sizing: border-box;
	cursor: pointer;
	display: grid;
	height: 32px;
	padding: 0 8px;
	text-align: right;
	width: 48px;

	& > div {
		align-self: center;
		background-color: ${(props: { value: boolean }) => props.value ? 'lightblue' : '#CCC'};
		border: 4px solid ${(props: { value: boolean }) => props.value ? '#7cb3c5' : '#CCC'};
		border-radius: 16px;
		box-sizing: border-box;
		display: grid;
		height: 24px;
		margin-left: ${(props: { value: boolean }) => props.value ? '8px' : 0};
		transition: all 300ms;
		width: 24px;
	}
`

interface Props {
	change: (value: boolean) => void
	value: boolean
}
export default function Toggle(props: Props) {
	return (
		<Wrapper
			value={props.value}
			onClick={() => props.change(!props.value)}
		>
			<div><div /></div>
		</Wrapper>
	)
}

