import * as React from 'react'
import styled from '@emotion/styled'
import { TOP_OFFSET, ASIDE_HANDLE_WIDTH, ASIDE_WIDTH, Viewport, TabPosition, SearchTab } from '../constants'
import Tabs from '../ui/tabs';

const Wrapper = styled.div`
	bottom: 0;
	display: grid;
	grid-template-columns: 100vw ${ASIDE_HANDLE_WIDTH}px;
	position: fixed;
	top: ${TOP_OFFSET}px;
	transform: translateX(${(props: { searchTab: SearchTab, viewport: Viewport }) => props.viewport === Viewport.Search ?
		0 :
		props.searchTab === SearchTab.Results ?
			`calc(-100vw + ${ASIDE_WIDTH}px)` :
			'-100vw'
	});
	transition: transform 300ms;
	width: calc(100vw + ${ASIDE_HANDLE_WIDTH}px);
	z-index: 6000;
`

export default function wrapAsFileExplorer(FileExplorer: React.ComponentClass<FileExplorerProps>) {
	return function FileExplorerWrapper(props: FileExplorerProps & Pick<AppState, 'setSearchTab'>) {
		return (
			<Wrapper
				searchTab={props.searchTab}
				viewport={props.viewport}
			>
				<FileExplorer {...props} />
				<Tabs
					onClick={props.setSearchTab}
					position={TabPosition.Left}
					tab={props.searchTab}
					tabs={[SearchTab.Search, SearchTab.Results]}
				/>
			</Wrapper>
		)
	}
}