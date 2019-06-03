import * as React from 'react'
import styled from '@emotion/styled';
import { MetadataItem } from '../index.components'
import { State as MainProps, TabName } from '../index'
import TextDataAside from './text-data'
import { ASIDE_HANDLE_WIDTH, ASIDE_HANDLE_HEIGHT, TOP_OFFSET, GRAY_LIGHT, GRAY_DARK, ASIDE_WIDTH, DEFAULT_SPACING } from '../../constants'
import { defaultMetadata } from 'docere-config'

const Wrapper = styled.aside`
	bottom: 0;
	display: grid;
	grid-template-columns: ${ASIDE_HANDLE_WIDTH}px auto;
	position: fixed;
	top: ${TOP_OFFSET}px;
	right: ${(props: HProps) => props.active ? 0 : `-${ASIDE_WIDTH + 6}px`};
	width: ${ASIDE_WIDTH + DEFAULT_SPACING}px;
	transition: right 300ms;
	z-index: 1000;
`

interface HProps { active: boolean }

const Body = styled.div`
	background-color: ${GRAY_DARK};
	box-shadow: 0px 0px 6px black;
	box-sizing: border-box;
	color: #EEE;
`

const Tab = styled.ul`
	align-self: center;
 	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	color: #BBB;
	cursor: pointer;
	line-height: ${ASIDE_HANDLE_HEIGHT}px;
	text-align: center;
	user-select: none;
`
const MenuItem = styled.li`
	background-color: #EEE;
 	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;

	${(props: HProps) => props.active ?
		`background-color: ${GRAY_LIGHT};
		color: #EEE;
		` : ''
	}
`

interface AsideProps {
	activeTab: TabName
	onClick: (activeListId: string, activeItemId: string) => void
	setActiveTab: (tab: TabName) => void
}
type Props = MainProps & AsideProps
export default class Aside extends React.Component<Props> {
	render() {
		return (
			<Wrapper active={this.props.activeTab != null}>
				<Tab>
					{
						Object.keys(TabName).map((tab: TabName) =>
							<MenuItem
								active={this.props.activeTab === tab}
								key={tab}
								onClick={() => this.props.setActiveTab(tab)}
							>
								{tab.slice(0, 1)}
							</MenuItem>
						)
					}
				</Tab>
				<Body>
					{
						this.props.activeTab === TabName.Metadata &&
						<ul style={{ padding: '1em' }}>
							{
								this.props.metadata
									.map(([id, value]) => {
										const data = config.metadata.find(md => md.id === id)
										if (data == null) return { ...defaultMetadata, title: id, value }
										else return { ...defaultMetadata, ...data, value }

									})
									.filter(data => data.aside)
									.map((data, index) => {
										return (
											<MetadataItem key={index}>
												<span>{data.title || data.id}</span>
												<span>{data.value}</span>
											</MetadataItem>
										)
									})
							}	
						</ul>
					}
					{
						this.props.activeTab === TabName.TextData &&
						<TextDataAside
							activeId={this.props.activeId}
							activeListId={this.props.activeListId}
							doc={this.props.doc}
							onItemClick={this.props.onClick}
						/>
					}
				</Body>
			</Wrapper>
		)
	}
}
