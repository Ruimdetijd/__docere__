import * as React from 'react'
import styled from '@emotion/styled'
import ItemInText from './item-in-text'
import { small } from '../../index.components';
import { GRAY_LIGHT, GRAY_DARK } from '../../../constants';

const H2 = styled.h2`
	background: ${GRAY_LIGHT};
    box-shadow: 0px 4px 4px -4px #111;
	color: #EEE;
	cursor: pointer;
	font-size: 1em;
	font-weight: normal;
	height: 48px;
	line-height: 48px;
	margin: 0;
	padding-left: 1em;
	position: relative;
    z-index: 1;

	&:after {
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid ${GRAY_LIGHT};
		content: '';
		height: 0;
		position: absolute;
		right: 24px;
		top: 48px;
		width: 0;
		z-index: 1;
	}

	& small {
		${small}
		color: #AAA;
	}
`

interface UlProps {
	active: boolean
	textdataLength: number
	height: number
}
const Ul = styled.ul`
	background: ${GRAY_DARK};
	height: ${(props: UlProps) => props.active ? `calc(${props.height}px - ${props.textdataLength * 48}px)` : 0};
	list-style: none;
	margin: 0;
	overflow: auto;
	position: relative;
	transition: height 160ms ease-out;

	${(props: UlProps) => (props.active) ? `& + h2 { box-shadow: 0px -4px 4px -4px #111; }` : ''}
`

interface AIProps {
	activeIndex: number
	color: string
}
const ActiveIndicator = styled.li`
	background: ${(props: AIProps) => props.activeIndex > -1 ? props.color : 'rgba(0, 0, 0, 0)'};
	height: 48px;
	${(props: AIProps) => props.activeIndex > -1 ? 'box-shadow: 1px 0px 8px #111' : ''};
	position: absolute;
	top: ${(props: AIProps) => props.activeIndex > -1 ? props.activeIndex * 48 : 0}px;
	transition: top 120ms ease-out;
	width: 8px;
`

interface Props {
	active: boolean
	activeItemId: string
	config: AppState['config']
	data: TextDataConfig
	containerHeight: number
	items: TextDataValue[]
	onItemClick: SetActiveId
	onListClick: (listId: string) => void
}
export default class ExtractedItems extends React.Component<Props> {
	render() {
		return (
			<>
				<H2
					onClick={() => this.props.onListClick(this.props.data.id)}
				>
					{this.props.data.title}
					<small>({this.props.items.length})</small>
				</H2>
				<Ul
					active={this.props.active}
					textdataLength={this.props.config.textdata.length}
					height={this.props.containerHeight}
				>
					<ActiveIndicator
						activeIndex={this.props.items.findIndex(item => item.key === this.props.activeItemId)}
						color={this.props.data.color}
					/>
					{
						this.props.items
							.map((item, i) =>
								<ItemInText
									active={item.key === this.props.activeItemId}
									count={item.count}
									key={item.key + i}
									onClick={() => this.props.onItemClick(item.key, this.props.data.id, null)}
								>
									{item.value}
								</ItemInText>
							)
					}
				</Ul>
			</>
		)
	}
}
