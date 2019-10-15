import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"
import 'docere-config'
import { EntryState } from '../../index'
import { GRAY_DARK } from '../../../constants'

interface WProps { active: boolean }
const Wrapper = styled.div`
	background: ${GRAY_DARK};
	bottom: 0;
	height: 100%;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: ${(p: WProps) => p.active ? 1 : -1};
`

interface Props extends WProps, Pick<AppState, 'setEntry' | 'configData'>, Pick<EntryState, 'activePanels'> {
	activeId: string
	activeListId: string
	doc: XMLDocument
	items: Record<string, any>
	onItemClick: SetActiveId
}
interface State {
	containerHeight: number
}
export default class TextDataAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		containerHeight: null,
	}

	async componentDidMount() {
		this.setState({
			containerHeight: this.wrapperRef.current.getBoundingClientRect().height,
		})
	}

	render() {
		return (
			<Wrapper
				active={this.props.active}
				ref={this.wrapperRef}
			>
				{
					this.props.configData.config.notes
						.map((itemConfig, index) => {
							return (
								<ExtractedItems
									active={this.props.activeListId === itemConfig.id || (this.props.activeListId == null && index === 0)}
									activeItemId={this.props.activeId}
									components={this.props.configData.components}
									config={this.props.configData.config}
									containerHeight={this.state.containerHeight}
									itemConfig={itemConfig}
									items={this.props.items[itemConfig.id]}
									itemsConfig={this.props.configData.config.notes}
									key={itemConfig.id}
									onItemClick={this.props.onItemClick}
									onListClick={() => this.props.onItemClick(null, itemConfig.id, null)}
									setEntry={this.props.setEntry}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
