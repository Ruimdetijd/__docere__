import * as React from 'react'
import styled from '@emotion/styled'
import Note from './note'
import { small } from '../../index.components';
import { GRAY_LIGHT, GRAY_DARK, BROWN_LIGHT } from '../../../constants';
import DocereTextView from 'docere-text-view';

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
	listCount: number
	height: number
}
const Ul = styled.ul`
	background: ${GRAY_DARK};
	box-sizing: border-box;
	height: ${(props: UlProps) => props.active ? `calc(${props.height}px - ${props.listCount * 48}px)` : 0};
	list-style: none;
	margin: 0;
	overflow: auto;
	padding: ${(props: UlProps) => props.active ? `2em 0` : 0};
	position: relative;
	transition: height 160ms ease-out;

	${(props: UlProps) => (props.active) ? `& + h2 { box-shadow: 0px -4px 4px -4px #111; }` : ''}
`

interface AIProps {
	active: boolean
	color: string
}
const ActiveIndicator = styled.div`
	background: ${(props: AIProps) => props.active ? props.color : 'rgba(0, 0, 0, 0)'};
	height: ${props => props.active ? '100%' : 0};
	left: 8px;
	position: absolute;
	top: 0;
	transition: top 120ms ease-out;
	width: 8px;
`

interface Props {
	active: boolean
	activeItemId: string
	components: DocereComponents
	config: AppState['config']
	containerHeight: number
	itemConfig: any
	items: any[]
	itemsConfig: any[]
	onItemClick: SetActiveId
	onListClick: (listId: string) => void
	setEntryId: AppState['setEntryId']
}
export default class ExtractedItems extends React.Component<Props> {
	render() {
		return (
			<>
				<H2
					onClick={() => this.props.onListClick(this.props.itemConfig.id)}
				>
					{this.props.itemConfig.title}
					<small>({this.props.items.length})</small>
				</H2>
				<Ul
					active={this.props.active}
					listCount={this.props.itemsConfig.length}
					height={this.props.containerHeight}
				>
					{
						this.props.items
							.map((item, i) =>
								<Note
									active={item.n === this.props.activeItemId}
									key={i}
									onClick={() => this.props.onItemClick(item.n, this.props.itemConfig.id, null)}
								>
									<div>{item.n}</div>
									<div>
										<DocereTextView
											components={this.props.components}
											customProps={{
												insideNote: true,
												setEntryId: this.props.setEntryId,
											}}
											node={item.el}
										/>
									</div>
									<ActiveIndicator
										active={item.n === this.props.activeItemId}
										color={BROWN_LIGHT}
									/>
								</Note>
							)
					}
				</Ul>
			</>
		)
	}
}
