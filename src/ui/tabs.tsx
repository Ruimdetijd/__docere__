import * as React from 'react'
import styled from "@emotion/styled";
import { ASIDE_HANDLE_HEIGHT, TabPosition, ASIDE_HANDLE_WIDTH, Viewport, GRAY_LIGHT } from "../constants";

export const Wrapper = styled.ul`
	align-self: center;
	justify-self: center;
	cursor: pointer;
	line-height: ${(props: Props) => props.position === TabPosition.Bottom ? ASIDE_HANDLE_WIDTH : ASIDE_HANDLE_HEIGHT}px;
	text-align: center;
	user-select: none;
	width: ${(props: Props) => props.position === TabPosition.Bottom ? ASIDE_HANDLE_HEIGHT : ASIDE_HANDLE_WIDTH}px;

	& > li {
		${(props: Props) => {
			if (props.position === TabPosition.Right) {
				return `
					border-top-left-radius: 8px;
					border-bottom-left-radius: 8px;
				`
			}
			else if (props.position === TabPosition.Left) {
				return `
					border-bottom-right-radius: 8px;
					border-top-right-radius: 8px;
				`
			}
			else if (props.position === TabPosition.Bottom) {
				return `
					border-top-left-radius: 8px;
					border-top-right-radius: 8px;
				`
			}
		}}
	}
`

type TabProps = Pick<Props, 'position'> & { active: boolean }
export const Tab = styled.li`
	background: linear-gradient(
		${(p: TabProps) => p.position === TabPosition.Bottom ?
			'to bottom' :
			p.position === TabPosition.Left ?
				'to left' :
				'to right'
			},
		#EEE,
		#CCC
	);
	border: 1px solid #CCC;
	color: ${(props: TabProps) => props.active ? '#EEE' : '#888'};
	transition: all 150ms;

	${(props: TabProps) => !props.active ? `&:hover { color: #444; }` : '' }

	& + li {
		border-top: 0;
	}

	${(props: TabProps) => {
		if (props.position === TabPosition.Left || props.position === TabPosition.Right) {
			if (props.active) {
				return `
					background: ${GRAY_LIGHT};
				`
			}		}
		else if (props.position === TabPosition.Bottom) {
			if (props.active) {
				return `
					background: black;
				`
			}
		}
	}}
`

interface Props extends Pick<AppState, 'viewport' | 'setAppState'> {
	position?: TabPosition
	tabs: Viewport[]
}
export default class Tabs extends React.PureComponent<Props> {
	static defaultProps = {
		position: TabPosition.Right
	}

	render() {
		return (
			<Wrapper {...this.props}>
				{
					this.props.tabs
						.map((tab) =>
							<Tab
								active={this.props.viewport === tab}
								key={tab}
								onClick={() => {
									if (this.props.viewport === tab) tab = Viewport.Entry
									this.props.setAppState('viewport', tab)
								}}
								position={this.props.position}
							>
								{tab.slice(0, 1)}
							</Tab>
						)
				}
			</Wrapper>
		)
	}
}
