import * as React from 'react'
import styled from "@emotion/styled"
import { excludeBlue, changePurple, replaceOrange, exporterGray, selectGreen, inactiveGray } from '../css';

const FormWrapper = styled('div')`
	border-radius: 10px;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
	margin-bottom: 1em;
	padding: 1em;

	${(props: { active: boolean, type: string }) => {
		if (!props.active) return inactiveGray
		if (props.type === 'exclude') return excludeBlue
		if (props.type === 'change') return changePurple
		if (props.type === 'select') return selectGreen
		if (props.type === 'replace') return replaceOrange
		if (props.type === 'exporter') return exporterGray
	}}
`

const FormHeaderWrapper = styled('h2')`
	margin: 0 0 1em 0;
	padding: 0;
	position: relative;
	text-align: center;
`

const ControlButtons = styled('div')`
	background-color: rgba(0, 0, 0, .15);
	border-radius: .5em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: .2em;
	position: absolute;
	right: 0;
	top: 0;
	transform: scale(.4);
	transform-origin: top right;
`

const Toggle = styled('div')`
	background-color: rgba(255, 255, 255, .25);
	border-radius: .5em;
	cursor: pointer;
	padding: .2em;
	position: relative;
	width: 2em;

	& > div {
		left: ${(props: { active: boolean }) => props.active ? 26 : 6}px;
		background-color: rgba(0, 0, 0, .4);
		border-radius: .5em;
		height: 1em;
		position: absolute; 
		transition: left 150ms;
		width: 1em;
	}
`

const Close = styled('div')`
	cursor: pointer;
	font-size: 1.2em;
	transform: scale(1.2);
`

interface FormHeaderProps {
	active: boolean
	label: string
	toggleActive: () => void
	close: () => void
}
export class FormHeader extends React.PureComponent<FormHeaderProps> {
	render() {
		return (
			<FormHeaderWrapper>
				{this.props.label}
				<ControlButtons>
					<Toggle
						active={this.props.active}
						onClick={this.props.toggleActive}
					>
						<div />
					</Toggle>
					<Close onClick={this.props.close}>✖</Close>	
				</ControlButtons>
			</FormHeaderWrapper>
		)
	}
}

interface Props {
	active: boolean
	change: (nextProps: any) => void
	children?: any
	close: () => void
	label: string
	type: 'exclude' | 'replace' | 'change' | 'select' | 'exporter'
}
export class Form extends React.PureComponent<Props> {
	render() {
		return (
			<FormWrapper
				active={this.props.active}
				type={this.props.type}
			>
				<FormHeader
					active={this.props.active}
					close={this.props.close}
					label={this.props.label}
					toggleActive={() => this.props.change({ active: !this.props.active })}
				/>
				{
					this.props.active &&
					this.props.children
				}
			</FormWrapper>
		)
	}
}