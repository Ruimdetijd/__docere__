import * as React from 'react'
import styled from '@emotion/styled'
import DocereTextView from 'docere-text-view'
import { TOP_OFFSET, DEFAULT_SPACING, BROWN_LIGHT } from '../constants'

const Wrapper = styled.div`
	background: white;
	bottom: 0;
	color: #222;
	display: grid;
	font-family: serif;
	font-size: 1.1rem;
	grid-template-columns: auto ${DEFAULT_SPACING * 20}px auto ${DEFAULT_SPACING * 2}px;
	left: 0;
	line-height: 2rem;
	overflow-y: auto;
	position: fixed;
	right: 0;
	top: ${TOP_OFFSET}px;
	z-index: 8000;

	& > div:first-of-type {
		grid-column: 2;
		padding-bottom: 33vh;
	}
	& > div:last-of-type {
		grid-column: 4;
	}
`

const Close = styled.div`
	align-content: center;
	color: #666;
	cursor: pointer;
	display: grid;
	font-size: 1.2em;
	height: 1em;
	justify-content: center;
	position: sticky;
	top: ${DEFAULT_SPACING}px;
`

const components = {
	a: styled.a``,
	br: styled.span`display: block;`,
	h2: styled.h2`
		margin-top: 2em;
	`,
	h3: styled.h3`
		margin-top: 2em;
	`,
	i: styled.i``,
	li: styled.li`
		margin-bottom: 1em;
	`,
	p: styled.div`
		margin-bottom: 1em;
	`,
	table: styled.ul`
		margin-top: 2em;
	`,
	tr: styled.li`
		border-bottom: 1px solid ${BROWN_LIGHT};
		display: grid;
		grid-column-gap: ${DEFAULT_SPACING}px;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 1em;
		padding-bottom: 1em;
	`,
	td: styled.div``,
	text: styled.div``,
	ul: styled.ul`
		list-style: disc;
		margin-left: 1em;

		ul {
			list-style: circle;
		}
	`,
}

function useGetPageConfig(page: Page, pages: PageConfig[]) {
	const [pageConfig, setPageConfig] = React.useState(null)

	React.useEffect(() => {
		const flatPages = pages.reduce((prev, curr) => {
			prev.push(curr)
			if (curr.hasOwnProperty('children')) {
				curr.children.forEach(child => prev.push(child))
			}
			return prev
		}, [] as PageConfig[])

		const pageConfig = flatPages.find(p => p.id === page.id)
		setPageConfig(pageConfig)
	}, [page, pages])

	return pageConfig
}

type Props = Pick<DocereConfigData, 'config'> & Pick<AppState, 'page' | 'setPage'>
export default React.memo(function PageView(props: Props) {
	if (props.page == null) return null
	const setPage = React.useCallback(() => props.setPage(), [])
	const pageConfig = useGetPageConfig(props.page, props.config.pages)
	if (pageConfig == null) return null

	return (
		<Wrapper>
			<DocereTextView
				// TODO make configurable
				components={components}
				node={pageConfig.doc}
			/>
			<Close onClick={setPage}>✕</Close>
		</Wrapper>
	)
})
