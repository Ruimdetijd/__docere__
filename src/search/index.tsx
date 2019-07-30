import * as React from 'react'
import styled from '@emotion/styled'
import HucFacetedSearch, { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'
import { DEFAULT_SPACING, TOP_OFFSET, ASIDE_HANDLE_WIDTH, ASIDE_WIDTH, Viewport, TabPosition, SearchTab } from '../constants'
import Tabs from '../ui/tabs';
import { defaultMetadata } from 'docere-config';

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

const FS = styled(HucFacetedSearch)`
	background: white;
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
					padding: 0 ${DEFAULT_SPACING}px ${DEFAULT_SPACING * 2}px ${DEFAULT_SPACING}px;
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
}
export default class Search extends React.Component<AppState, State> {
	private searchRef = React.createRef() as React.RefObject<HucFacetedSearch>

	state: State = {
		fields: [],
		resultBody: null,
	}

	async componentDidMount() {
		let rbImport

		try {
			// Import the non-generic ResultBody component
			rbImport = await import(`../project-components/${this.props.config.slug}/result-body.tsx`)
		} catch (err) {
			rbImport = await import('../project-components/generic-result-body')
		}

		let tmpfields
		try {
			const result = await fetch(`/search/${this.props.config.slug}/_mapping`)
			const json = await result.json()
			const { properties } = json[this.props.config.slug].mappings.doc
			tmpfields = Object.keys(properties)
				.filter(key => key !== 'text' && key !== 'facsimiles' && key !== 'id')
				.map(key => {
					let config = this.props.config.metadata.find(md => md.id === key)
					if (config == null) this.props.config.textdata.find(td => td.id === key)
					if (config == null) config = {
						...defaultMetadata,
						id: key
					}

					return config
				})
		} catch (err) {
			console.log(err)
		}

		// Prepare the facets definitions from the config
		const fields = tmpfields
			.filter(field => field.datatype !== EsDataType.null && field.datatype !== EsDataType.text )
			.sort((f1, f2) => f1.order - f2.order)
		
		this.setState({
			fields,
			resultBody: rbImport.default
		})
	}

	shouldComponentUpdate(nextProps: AppState, nextState: State) {
		// Update when the resultBody is loaded
		if (this.state.resultBody == null && nextState.resultBody != null) return true

		// Don't update when the search is not involved in the view
		if (
			this.props.viewport !== Viewport.Search &&
			this.props.searchTab !== SearchTab.Results &&
			nextProps.viewport !== Viewport.Search &&
			nextProps.searchTab !== SearchTab.Results
		) return false

		return true
	}

	render() {
		if (this.state.resultBody == null) return null

		return (
			<Wrapper
				searchTab={this.props.searchTab}
				viewport={this.props.viewport}
			>
				<FS
					backend="elasticsearch"
					disableDefaultStyle={this.props.searchTab === SearchTab.Results}
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
										labels={{ false: "Nee", true: "Ja" }}
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
											size={field.size}
											title={formatTitle(field)}
										/>
						)
					}
				</FS>
				<Tabs
					onClick={this.props.setSearchTab}
					position={TabPosition.Left}
					tab={this.props.searchTab}
					tabs={[SearchTab.Search, SearchTab.Results]}
				/>
			</Wrapper>
		)
	}
}
