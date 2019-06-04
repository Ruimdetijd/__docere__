import * as React from 'react'
import styled from '@emotion/styled'
import HucFacetedSearch, { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'
import ResultBodyComponent from './result-body'
import { DEFAULT_SPACING, TOP_OFFSET, ASIDE_HANDLE_WIDTH, ASIDE_WIDTH, Viewport } from '../constants'
import { defaultMetadata } from 'docere-config'
import { Tabs, Tab } from '../ui/tabs'

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 100vw ${ASIDE_HANDLE_WIDTH}px;
	height: calc(100vh - ${TOP_OFFSET}px);
	position: fixed;
	top: ${TOP_OFFSET}px;
	transform: translateX(${(props: { viewport: Viewport }) => props.viewport === Viewport.Search?
		0 :
		props.viewport === Viewport.Results ?
			`calc(-100vw + ${ASIDE_WIDTH}px)` :
			'-100vw'
	});
	transition: transform 300ms;
	width: calc(100vw + ${ASIDE_HANDLE_WIDTH}px);
	z-index: 1001;
`

const FS = styled(HucFacetedSearch)`
	box-sizing: border-box;
	height: calc(100vh - ${TOP_OFFSET}px);
	overflow-y: auto;
	overflow-x: hidden;
	padding-top: ${DEFAULT_SPACING * 2}px;
	width: 100vw;

	${props => {
		if (props.disableDefaultStyle) {
			return `
				display: grid;
				grid-template-columns: calc(100vw - ${ASIDE_WIDTH}px) ${ASIDE_WIDTH}px;

				& > aside {
					max-height: 0;
					overflow: hidden;
				}

				& > section {
					padding: 0 ${DEFAULT_SPACING}px;
				}
			`
		}
	}}
`

interface State {
	request: any
	searchResults: any
}
export default class Search extends React.Component<AppState, State> {
	private searchRef = React.createRef() as React.RefObject<HucFacetedSearch>

	state: State = {
		request: null,
		searchResults: {
			hits: [],
			total: 0
		}
	}

	render() {
		const fields = config.metadata
			.map(m => ({ ...defaultMetadata, ...m }))
			.filter(field => field.datatype !== 'null')
			.sort((f1, f2) => f1.order - f2.order)

		return (
			<Wrapper viewport={this.props.viewport}>
				<FS
					backend="elasticsearch"
					disableDefaultStyle={this.props.viewport === Viewport.Results}
					onChange={this.handleChange}
					onClickResult={result => this.props.setId(result.id)}
					ref={this.searchRef}
					resultBodyComponent={ResultBodyComponent}
					resultBodyProps={{
						activeId: this.props.id,
						viewport: this.props.viewport,
					}}
					resultsPerPage={config.searchResultCount}
					url={`/search/${config.slug}/_search`}
				>
					{
						fields.map(field => 
							field.datatype === 'boolean' ?
								<BooleanFacet
									field={field.id}
									key={field.id}
									labels={["Nee", "Ja"]}
									title={field.title || field.id}
								/> :
								field.datatype === 'date' ?
									<RangeFacet
										field={field.id}
										key={field.id}
										title={field.title || field.id}
										type="timestamp"
									/> :
									<ListFacet
										field={field.id}
										key={field.id}
										title={field.title || field.id}
									/>
						)
					}
				</FS>
				<Tabs right>
					{
						Object.keys(Viewport)
							.filter(tab => tab === Viewport.Search || tab === Viewport.Results)
							.map((tab) =>
								<Tab
									active={tab === this.props.viewport}
									key={tab}
									onClick={() => {
										if (tab === Viewport.Results && this.props.viewport === Viewport.Results) tab = Viewport.Entry
										this.props.setAppState('viewport', tab)
									}}
								>
									{tab.slice(0, 1)}
								</Tab>
							)
					}
				</Tabs>
			</Wrapper>
		)
	}

	private handleChange = (changeResponse: OnChangeResponse) => {
		if (changeResponse.query.length) this.props.setAppState('searchQuery', changeResponse.query)
		this.setState({ request: changeResponse.request, searchResults: changeResponse.response })
	}
}
