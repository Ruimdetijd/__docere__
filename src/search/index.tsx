import * as React from 'react'
import styled from '@emotion/styled'
import HucFacetedSearch, { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'
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
	z-index: 6000;
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

function formatTitle(facetFields: MetaDataConfig) {
	const title = facetFields.title || facetFields.id
	return title.replace(/_/ug, ' ').toUpperCase()
}

interface State {
	fields: MetaDataConfig[]
	resultBody: React.FunctionComponent<ResultBodyProps>
	request: any
	searchResults: any
}
export default class Search extends React.Component<AppState, State> {
	private searchRef = React.createRef() as React.RefObject<HucFacetedSearch>

	state: State = {
		fields: [],
		resultBody: null,
		request: null,
		searchResults: {
			hits: [],
			total: 0
		}
	}

	async componentDidMount() {
		// Import the non-generic ResultBody component
		const rbImport = await import(`../project-components/${this.props.config.slug}/result-body.tsx`)

		// Prepare the facets definitions from the config
		const fields = this.props.config.metadata
			.map(m => ({ ...defaultMetadata, ...m }))
			.filter(field => field.datatype !== EsDataType.null && field.datatype !== EsDataType.text )
			.sort((f1, f2) => f1.order - f2.order)
		
		this.setState({
			fields,
			resultBody: rbImport.default
		})
	}

	render() {
		if (this.state.resultBody == null) return null

		return (
			<Wrapper viewport={this.props.viewport}>
				<FS
					backend="elasticsearch"
					disableDefaultStyle={this.props.viewport === Viewport.Results}
					onChange={this.handleChange}
					onClickResult={result => this.props.setEntryId(result.id)}
					ref={this.searchRef}
					resultBodyComponent={this.state.resultBody}
					resultBodyProps={{
						activeId: this.props.entryId,
						viewport: this.props.viewport,
					}}
					resultsPerPage={this.props.config.searchResultCount}
					url={`/search/${this.props.config.slug}/_search`}
				>
					{
						this.state.fields
							.map(field => 
								field.datatype === 'boolean' ?
									<BooleanFacet
										field={field.id}
										key={field.id}
										labels={["Nee", "Ja"]}
										title={formatTitle(field)}
									/> :
									field.datatype === 'date' ?
										<RangeFacet
											field={field.id}
											key={field.id}
											title={formatTitle(field)}
											type="timestamp"
										/> :
										<ListFacet
											field={field.id}
											key={field.id}
											title={formatTitle(field)}
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
