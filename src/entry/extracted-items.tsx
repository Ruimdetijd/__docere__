import * as React from 'react'
import styled from '@emotion/styled'
import { ItemInText, small } from './index.components'

const Wrapper = styled.div`
	margin-bottom: 2em;

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
`

const H2 = styled.h2`
	cursor: pointer;
	font-size: 1em;
	margin: 0;
	margin-bottom: .5em;

	& small {
		${small}
	}
`

interface Props {
	activeId: string
	data: TextData
	items: { key: string, value: string }[]
	// extractor: Extractor
	onClick: (activeId: string) => void
}
interface State {
	active: boolean
}
export default class ExtractedItems extends React.Component<Props, State> {
	state: State = {
		active: false
	}

	// componentDidUpdate() {
	// 	if (!this.state.active) {
	// 		const activeItem = this.props.items.find(item => item.node.attributes[ID_ATTRIBUTE_NAME] === this.props.activeId)
	// 		if (activeItem != null) {
	// 			this.setState({ active: true })
	// 		}
	// 	}
	// }

	render() {
		return (
			<Wrapper>
				<H2 onClick={() => this.setState({ active: !this.state.active })}>
					{this.props.data.title}
					{
						!this.state.active &&
						<small>({this.props.items.length})</small>
					}
				</H2>
				{
					this.state.active &&
					<ul>
						{
							this.props.items.map((item) =>
								<ItemInText
									active={item.key === this.props.activeId}
									count={0}
									key={item.key}
									// node={item.node}
									onClick={() => this.props.onClick(item.key)}
									value={item.value}
								>
									{item.value}
								</ItemInText>
							)
						}
					</ul>
				}
			</Wrapper>
		)
	}
}
