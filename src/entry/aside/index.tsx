import * as React from 'react'
import styled from '@emotion/styled';
import { State as EntryProps } from '../index'
import MetadataAside from './metadata'
import TextDataAside from './text-data'
import { ASIDE_HANDLE_WIDTH, GRAY_DARK, ASIDE_WIDTH, DEFAULT_SPACING, TOP_OFFSET, Viewport } from '../../constants'
import { Tabs, Tab } from '../../ui/tabs'

const Wrapper = styled.aside`
	bottom: 0;
	display: grid;
	grid-template-columns: ${ASIDE_HANDLE_WIDTH}px auto;
	height: calc(100vh - ${TOP_OFFSET}px);
	position: absolute;
	top: 0;
	right: -${ASIDE_WIDTH}px;
	width: ${ASIDE_WIDTH + DEFAULT_SPACING}px;
	z-index: 1000;
`
	// right: 0;
	// transform: translateX(${(props: HProps) => props.active ? 0 : `${ASIDE_WIDTH + 6}px`});
	// transition: transform 300ms;


const Body = styled.div`
	background-color: ${GRAY_DARK};
	box-sizing: border-box;
	color: #EEE;
`

interface AsideProps {
	setActiveId: (activeListId: string, activeItemId: string) => void
}
type Props = AppState & EntryProps & AsideProps
export default class Aside extends React.Component<Props> {
	render() {
		return (
			<Wrapper>
				<Tabs>
					{
						Object.keys(Viewport)
							.filter(tab => tab === Viewport.Metadata || tab === Viewport.TextData)
							.map((tab) =>
								<Tab
									active={this.props.viewport === tab}
									key={tab}
									onClick={() => {
										if (this.props.viewport === tab) tab = Viewport.Entry
										this.props.setAppState('viewport', tab)
									}}
								>
									{tab.slice(0, 1)}
								</Tab>
							)
					}
				</Tabs>
				<Body>
					{
						this.props.viewport === Viewport.Metadata &&
						<MetadataAside
							metadata={this.props.metadata}
						/>
					}
					{
						this.props.viewport === Viewport.TextData &&
						<TextDataAside
							activeId={this.props.activeId}
							activeListId={this.props.activeListId}
							doc={this.props.doc}
							onItemClick={this.props.setActiveId}
						/>
					}
				</Body>
			</Wrapper>
		)
	}
}
