import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"

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
	items: Record<string, TextDataValue[]>
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
			items: this.extractItems()
		})
	}

	private extractItems() {
		return config.textdata.reduce((prev, curr) => {
			const items = {}
			prev[curr.id] = Array.from(this.props.doc.querySelectorAll(curr.extractor.selector))
				.reduce((prev, currEl) => {
					const key = currEl.textContent
					if (items.hasOwnProperty(key)) {
						items[key].count = items[key].count + 1
					}
					else {
						items[key] = { key, value: currEl.textContent, count: 1 }
						prev.push(items[key])
					}
					return prev
				}, []) 
			
			return prev
		}, {})
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
