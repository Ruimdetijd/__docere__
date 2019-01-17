import * as React from 'react'
import styled from '@emotion/styled'
import { Tabs, Tab } from 'hire-tabs'
import Input from './input'
import MiniEditor from './mini-editor';

const StyledTabs = styled(Tabs)`
	background: rgba(0, 0, 0, .1);
	margin-top: 1em;
	padding: 0.5em;

	ul {
		margin-bottom: .5em;

		& > li {
			border-radius: 4px;
			cursor: pointer;
			display: inline-block;
			padding: 4px 0;
			text-align: center;
			width: 50%;

			&.active {
				background-color: rgba(255, 255, 255, .7);
			}
		}
	}
`

type TabType = 'Selector' | 'Selector function'

interface Props {
	change: (sourceSelectorFunc: string) => void
}
interface State {
	activeTab: TabType
	inputValue: string
}
export default class StringOrFunction extends React.PureComponent<Props, State> {
	state: State = {
		activeTab: 'Selector',
		inputValue: '',
	}
	// this.editor.getModel().getValue()

	componentDidUpdate(_prevProps: any, prevState: State) {
		if (prevState.inputValue !== this.state.inputValue && this.state.inputValue.length) {
			this.props.change(`function() { return "${this.state.inputValue}" }`)
		}
	}

	render() {
		return (
			<StyledTabs
				activeTab={this.state.activeTab}
				onChange={(activeTab: TabType) => this.setState({ activeTab })}
			>
				<Tab label="Selector">
					<Input
						onChange={(ev) => this.setState({ inputValue: ev.currentTarget.value })}
						value={this.state.inputValue}
					/>
				</Tab>
				<Tab label="Selector function">
					<MiniEditor
						change={this.props.change}
						initValue={`function sourceSelector(target) {\n\treturn '#not-found'\n}`}
					/>
				</Tab>
			</StyledTabs>
		)
	}
}
