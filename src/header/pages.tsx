import * as React from 'react'
import styled from '@emotion/styled'
import { DEFAULT_SPACING } from '../constants'

const Wrapper = styled.ul`
	text-align: right;
	align-self: center;

	& > li {
		padding-bottom: .8em;
	}

	li {
		display: inline-block;
		margin-right: ${DEFAULT_SPACING}px;
		color: #444;
		font-size: .8rem;
		position: relative;
		text-transform: lowercase;

		&:hover {
			ul {
				display: block;
			}
		}

		ul {
			border-radius: 3px;
			box-shadow: 1px 1px 2px #666;
			background-color: #ead6ad;
			display: none;
			margin-top: .8em;
			padding-bottom: .5em;
			position: absolute;
			right: 0;

			li {
				display: block;
				margin-right: 0;
				white-space: nowrap;
			}
		}
	}
`

const Link = styled.button`
	background: none;
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0);
	color: inherit;
	cursor: pointer;
	font-size: inherit;
	outline: none;
	padding: .8em 0 .2em 0;
	margin: 0 1em;
	text-transform: inherit;

	&:hover {
		border-bottom: 1px solid #666;
	}
`

type PageMenuItemProps = { pageConfig: PageConfig } & Pick<AppState, 'setPage'>
function PageMenuItem(props: PageMenuItemProps) {
	const setPage = React.useCallback(() => props.setPage(props.pageConfig.id), [props.pageConfig.id])
	return (
		<li>
			<Link
				onClick={setPage}
			>
				{props.pageConfig.title}
			</Link>
		</li>
	)
}

type Props = { config: DocereConfig } & Pick<AppState, 'setPage'>
export default React.memo(function PagesMenu(props: Props) {
	return (
		<Wrapper>
			{
				props.config.pages.map(page =>
					page.hasOwnProperty('children') ?
						<li key={page.id}>
							<span>{page.title} ▾</span>
							<ul>
								{
									page.children.map(child =>
										<PageMenuItem key={child.id} pageConfig={child} setPage={props.setPage} />
									)
								}
							</ul>
							
						</li> :
						<PageMenuItem key={page.id} pageConfig={page} setPage={props.setPage} />
				)
			}
		</Wrapper>
	)
})
