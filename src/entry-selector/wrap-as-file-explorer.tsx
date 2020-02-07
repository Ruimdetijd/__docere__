import * as React from 'react'
import styled from '@emotion/styled'
import { TOP_OFFSET, ASIDE_HANDLE_WIDTH, RESULT_ASIDE_WIDTH, TabPosition, SearchTab } from '../constants'
import Tabs from '../ui/tabs';

const Wrapper = styled.div`
	bottom: 0;
	display: grid;
	grid-template-columns: 100vw ${ASIDE_HANDLE_WIDTH}px;
	position: fixed;
	top: ${TOP_OFFSET}px;
	transform: translateX(${(props: { searchTab: SearchTab }) => props.searchTab === SearchTab.Search ?
		0 :
		props.searchTab === SearchTab.Results ?
			`calc(-100vw + ${RESULT_ASIDE_WIDTH}px)` :
			'-100vw'
	});
	transition: transform 300ms;
	width: calc(100vw + ${ASIDE_HANDLE_WIDTH}px);
	z-index: 6000;
`

export default function wrapAsFileExplorer(FileExplorer: React.FC<FileExplorerProps>) {
	return function FileExplorerWrapper(props: FileExplorerProps & Pick<AppState, 'setSearchTab'>) {
		return (
			<Wrapper
				searchTab={props.searchTab}
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
