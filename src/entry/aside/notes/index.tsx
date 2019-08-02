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

interface Props extends WProps, Pick<AppState, 'config'> {
	activeId: string
	activeListId: string
	activePanels: EntryState['activePanels']
	doc: XMLDocument
	items: Record<string, any>
	itemsConfig: any[]
	onItemClick: SetActiveId
}
interface State {
	components: DocereComponents
	containerHeight: number
}
export default class TextDataAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		components: {},
		containerHeight: null,
	}

	async componentDidMount() {
		const { default: getComponents } = await import(`../../../project-components/${this.props.config.slug}`) as { default : GetComponents }
		const components = getComponents(this.props.config)
		this.setState({
			components,
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
					this.props.itemsConfig
						.map((itemConfig, index) => {
							return (
								<ExtractedItems
									active={this.props.activeListId === itemConfig.id || (this.props.activeListId == null && index === 0)}
									activeItemId={this.props.activeId}
									components={this.state.components}
									config={this.props.config}
									itemConfig={itemConfig}
									itemsConfig={this.props.itemsConfig}
									containerHeight={this.state.containerHeight}
									items={this.props.items[itemConfig.id]}
									key={itemConfig.id}
									onItemClick={this.props.onItemClick}
									onListClick={() => this.props.onItemClick(null, itemConfig.id, null)}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
