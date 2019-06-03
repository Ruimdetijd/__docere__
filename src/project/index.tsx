import * as React from 'react'
import styled from '@emotion/styled'
import HucFacetedSearch, { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'
import ResultBodyComponent from './result-body'
import { DEFAULT_SPACING } from '../constants';
import { defaultMetadata } from 'docere-config';

const Wrapper = styled.div`
	margin-top: ${DEFAULT_SPACING * 2}px;
`

interface Props {
	setSearchQuery: (query: string) => void
}
interface State {
	request: any
	searchResults: any
}
export default class Search extends React.Component<Props, State> {
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
			<Wrapper>
				<HucFacetedSearch
					backend="elasticsearch"
					onChange={this.handleChange}
					resultBodyComponent={ResultBodyComponent(config.slug)}
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
				</HucFacetedSearch>
			</Wrapper>
		)
	}

	private handleChange = (changeResponse: OnChangeResponse) => {
		if (changeResponse.query.length) this.props.setSearchQuery(changeResponse.query)
		this.setState({ request: changeResponse.request, searchResults: changeResponse.response })
	}
}
