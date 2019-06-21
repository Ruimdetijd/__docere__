import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"
import 'docere-config'
import { EntryState } from '../../index'

interface WProps { active: boolean }
const Wrapper = styled.div`
	height: 100%;
	position: absolute;
	z-index: ${(p: WProps) => p.active ? 1 : -1};
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`

interface Props extends WProps, Pick<AppState, 'config' | 'extractTextData'> {
	activeId: string
	activeListId: string
	activePanels: EntryState['activePanels']
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
			items: this.props.extractTextData(this.props.doc, this.props.config)
		})
	}

	render() {
		const textdata = (!Array.isArray(this.props.config.textdata) || this.state.items == null) ? [] : this.props.config.textdata

		return (
			<Wrapper
				active={this.props.active}
				ref={this.wrapperRef}
			>
				{
					textdata
						.filter(data => this.props.activePanels.findIndex(ap => ap.id === data.id) > -1)
						.map((data) => {
							return (
								<ExtractedItems
									active={this.props.activeListId === data.id}
									activeItemId={this.props.activeId}
									config={this.props.config}
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
