import * as React from 'react'
import styled from '@emotion/styled';
import { MetadataItem } from '../index.components'
import { State as MainProps, TabName } from '../index'
import TextDataAside from './text-data'
import { ASIDE_HANDLE_WIDTH, ASIDE_HANDLE_HEIGHT, TOP_OFFSET, GRAY_LIGHT, GRAY_DARK } from '../../constants'

const defaultMetadata: MetaData = {
	aside: true,
	id: null,
}

const Wrapper = styled.aside`
	display: grid;
	grid-template-columns: ${ASIDE_HANDLE_WIDTH} ${ASIDE_HANDLE_WIDTH} auto;
	height: calc(100vh - ${TOP_OFFSET});
	position: sticky;
	top: ${TOP_OFFSET};

	${(props: HProps) => {
		if (!props.active) {
			return `
				position: fixed;
				right: 0;
				width: 64px;
			`
		}
	}}
`

interface HProps { active: boolean }

const Body = styled.div`
	background-color: ${GRAY_DARK};
	box-shadow: 0px 0px 6px black;
	box-sizing: border-box;
	color: #EEE;
	grid-column: 3;
`

const Tab = styled.ul`
	align-self: center;
	background-color: #EEE;
 	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	color: #BBB;
	cursor: pointer;
	grid-column: 2;
	line-height: ${ASIDE_HANDLE_HEIGHT};
	text-align: center;
	user-select: none;
`
const MenuItem = styled.li`
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
												<span>{data.title}</span>
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
