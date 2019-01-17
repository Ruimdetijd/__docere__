import * as React from 'react'
// import styled from '@emotion/styled'

// import { changePurple } from '../../css'
import MiniEditor from '../../ui/mini-editor'
// import Button from '../../ui/button'
import Input from '../../ui/input'
import { Form } from '../../ui/form'

// interface State {
// 	active: 
// 	selector: string
// 	changeFunc: string
// }
export default class ChangeForm extends React.PureComponent<FormProps<ChangeTransformer>> {
	inputRef: React.RefObject<HTMLInputElement>

	// state: State = {
	// 	active: this.props.handler.active,
	// 	changeFunc: this.props.handler.changeFunc, 
	// 	selector: this.props.handler.selector,
	// }

	constructor(props: FormProps<ChangeTransformer>) {
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
				label="Change"
				type="change"
			>
				<Input
					onChange={(ev) => {
						this.props.change({ selector: ev.currentTarget.value })
						// this.setState({ selector: ev.currentTarget.value })
					}}
					placeholder="Selector for element(s) to change"
					ref={this.inputRef}
					style={{ marginBottom: '1em' }}
					value={this.props.handler.selector}
				/>
				{
					this.props.handler.selector.length > 0 &&
					<MiniEditor
						change={changeFunc => this.props.change({ changeFunc })}
						initValue={`function changeFunc(target) {\n\treturn target\n}`}
					/>
				}
				{/* {
					this.props.handler.selector.length > 0 &&
					this.props.handler.changeFunc.length > 0 &&
					<Button
						onClick={() => this.props.change({
							changeFunc: this.state.changeFunc,
							selector: this.state.selector,
						})}
					>
						Add change transform
					</Button>
				} */}
			</Form>
		)
	}
}