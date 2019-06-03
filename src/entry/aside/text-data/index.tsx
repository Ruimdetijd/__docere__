import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"
import 'docere-config'

const Wrapper = styled.div`
	height: 100%;
`

interface Props {
	activeId: string
	activeListId: string
	doc: XMLDocument
	onItemClick: (activeListId: string, activeItemId: string) => void
}
interface State {
	containerHeight: number
	items: ExtractedTextData
}
export default class TextDataAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		containerHeight: null,
		items: null,
	}

	componentDidMount() {
		this.setState({
			containerHeight: this.wrapperRef.current.getBoundingClientRect().height,
			items: extractTextData(this.props.doc, config)
		})
	}

	render() {
		const textdata = (!Array.isArray(config.textdata) || this.state.items == null) ? [] : config.textdata

		return (
			<Wrapper ref={this.wrapperRef}>
				{
					textdata.map((data) => {
						return (
							<ExtractedItems
								active={this.props.activeListId === data.id}
								activeItemId={this.props.activeId}
								data={data}
								containerHeight={this.state.containerHeight}
								items={this.state.items[data.id]}
								key={data.id}
								onItemClick={this.props.onItemClick}
								onListClick={() => this.props.onItemClick(data.id, null)}
							/>
						)
					})
				}
			</Wrapper>

		)
	}
}
