import * as React from 'react'
import styled from "@emotion/styled";
import { ASIDE_HANDLE_HEIGHT, TabPosition, ASIDE_HANDLE_WIDTH, GRAY_LIGHT, FooterTab } from "../constants";
import icons from './icons'

export const Wrapper = styled.ul`
	align-self: center;
	justify-self: center;
	cursor: pointer;
	line-height: ${(props: WProps) => props.position === TabPosition.Bottom ? ASIDE_HANDLE_WIDTH : ASIDE_HANDLE_HEIGHT}px;
	text-align: center;
	user-select: none;
	width: ${props => props.position === TabPosition.Bottom ? ASIDE_HANDLE_HEIGHT : ASIDE_HANDLE_WIDTH}px;

	& > li {
		${props => {
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
	align-content: center;
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
	display: grid;
	height: 32px;
	justify-content: center;
	transition: all 150ms;

	${(props: TabProps) => !props.active ? `&:hover { color: #444; }` : '' }

	& + li {
		border-top: 0;
	}

	& svg {
		width: 20px;
		height: 20px;
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

interface WProps {
	position?: TabPosition
}
interface Props extends WProps {
	onClick: (tab: SearchTab | FooterTab | AsideTab) => void
	tab: SearchTab | FooterTab | AsideTab
	tabs: (SearchTab | FooterTab | AsideTab)[]
}

function Tabs(props: Props) {
	const handleTabClick = React.useCallback(e => {
		const tab = e.currentTarget.dataset.tab
		props.onClick(tab)
	}, [])

	return (
		<Wrapper position={props.position}>
			{
				props.tabs
					.map((tab) => {
						const Icon = icons[tab]
						return (
							<Tab
								active={props.tab === tab}
								data-tab={tab}
								key={tab}
								onClick={handleTabClick}
								position={props.position}
							>
								{
									Icon != null ?
										<Icon active={props.tab === tab} /> :
										tab.slice(0, 1)
								}
							</Tab>
						)
					})
			}
		</Wrapper>
	)
}

Tabs.defaultProps = {
	position: TabPosition.Right
}

export default React.memo(Tabs)
