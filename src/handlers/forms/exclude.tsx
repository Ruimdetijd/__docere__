import * as React from 'react'
import styled from '@emotion/styled'
import Input from '../../ui/input'
import { Form } from '../../ui/form'

const Exclude = styled('li')`
	background: #7272b3;
	border-radius: .5em;
	color: white;
	cursor: pointer;
	display: inline-block;
	font-weight: bold;
	margin: 0 .5em .5em 0;
	padding: .5em;
`

interface State {
	inputValue: string
}
export default class ExcludeForm extends React.PureComponent<FormProps<ExcludeTransformer>, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		inputValue: ''
	}

	constructor(props: FormProps<ExcludeTransformer>) {
		super(props)
		this.inputRef = React.createRef()
	}

	componentDidMount() {
		this.inputRef.current.focus()
	}

	render() {
		return (
			<Form
				active={this.props.handler.active}
				change={this.props.change}
				close={this.props.close}
				label="Exclude"
				type="exclude"
			>
				<Input
					onChange={(ev) => {
						this.setState({ inputValue: ev.currentTarget.value })
					}}
					onKeyDown={(ev) => {
						if (ev.keyCode === 13) {
							this.props.change({
								selector: this.props.handler.selector.concat(ev.currentTarget.value),
							})
							this.setState({ inputValue: '' })
						}
					}}
					ref={this.inputRef}
					value={this.state.inputValue}
				/>
				<ul style={{ marginTop: '1em' }}>
					{
						(this.props.handler.selector as string[]).map((exclude, index) =>
							<Exclude
								key={index}
								onClick={() => {
									this.props.change({
										selector: (this.props.handler.selector as string[]).filter(s => s !== exclude),
									})
								}}
							>
								{exclude}
							</Exclude>
						)
					}
				</ul>
			</Form>
		)
	}
}