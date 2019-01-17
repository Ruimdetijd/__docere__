import * as React from 'react'
import styled from "@emotion/styled"
import { XmlOption, DataOption, TextOption, ExcludeButton, ReplaceButton, ChangeButton, SelectButton } from './buttons'
import { Button } from '../ui/button';
import { handlerDefaults } from 'xmlio'

export const Wrapper = styled('div')`
	background: rgba(255, 255, 255, .4);
	border: 4px dashed rgba(165, 42, 42, .${(props: State) => props.menu ? '8' : '4'});
	border-radius: 10px;
	padding: 1em;
`

export const Empty = styled(Button)`
	font-size: 1.5em;
	margin: 0;
`

interface Props {
	change: (handler: Handler) => void
	type: 'transformers' | 'exporters'
}
interface State {
	menu: boolean
}
export default class AddTransform extends React.PureComponent<Props, State> {
	state: State = {
		menu: false,
	}

	render() {
		return (
			<Wrapper menu={this.state.menu}>
				{
					!this.state.menu &&
					<Empty onClick={() => this.setState({ menu: true })}>{`Add ${this.props.type === 'transformers' ? 'transformer' : 'exporter'}`}</Empty>
				}
				{
					this.state.menu && this.props.type === 'transformers' &&
					<>
						<ExcludeButton onClick={this.handleClick('exclude')}>Exclude</ExcludeButton>
						<ReplaceButton onClick={this.handleClick('replace')}>Replace</ReplaceButton>
						<ChangeButton onClick={this.handleClick('change')}>Change</ChangeButton>
						<SelectButton onClick={this.handleClick('select')}>Select</SelectButton>
					</>
				}
				{
					this.state.menu && this.props.type === 'exporters' &&
					<>
						<XmlOption onClick={this.handleClick('xml')}>XML</XmlOption>
						<DataOption onClick={this.handleClick('data')}>JSON</DataOption>
						<TextOption onClick={this.handleClick('text')}>Text</TextOption>
					</>
				}
			</Wrapper>
		)
	}

	handleClick = (type: HandlerType) => () => {
		const handler = handlerDefaults[type]
		this.setState({ menu: false })
		this.props.change(handler)
	}
}