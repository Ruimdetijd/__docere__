import * as React from 'react'
import styled from '@emotion/styled'
import HucFacetedSearch  from 'huc-faceted-search'
import { DEFAULT_SPACING, TOP_OFFSET, RESULT_ASIDE_WIDTH, SearchTab } from '../constants'
import { defaultMetadata } from '../export/extend-config-data'
import { fetchJson } from '../utils'
import GenericResultBodyComponent from '../project-components/generic-result-body'

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
				grid-template-columns: calc(100vw - ${RESULT_ASIDE_WIDTH}px) ${RESULT_ASIDE_WIDTH}px;

				& > aside {
					max-height: 0;
					overflow: hidden;
				}

				section#huc-fs-search-results {
					padding: 0 ${DEFAULT_SPACING}px ${DEFAULT_SPACING * 2}px ${DEFAULT_SPACING}px;

					& > header {
						& > div:first-of-type,
						& > div:nth-of-type(2) {
							display: none;
						}
					}


					.pagenumbers {
						& > div:not(.active) {
							display: none;
						}

						& > .active {
							background: none;
							color: #888;
						}
					}
				}
			`
		}
	}}
`


// function getResultBodyComponent(projectId: string) {
// 	return async function() {
// 		let ResultBodyComponent: React.FunctionComponent<ResultBodyProps>

// 		try {
// 			ResultBodyComponent = await import(`../project-components/${projectId}/result-body.tsx`)
// 		} catch (err) {
// 			ResultBodyComponent = await import('../project-components/generic-result-body') as any
// 		}

// 		// @ts-ignore
// 		return ResultBodyComponent.default
// 	}
// }

function useFields(config: DocereConfig) {
	const [fields, setFields] = React.useState<MetaDataConfig[]>([])

	React.useEffect(() => {
		fetchJson(`/search/${config.slug}/_mapping`)
			.then(json => {
				const { properties } = json[config.slug].mappings
				const tmpFields = Object.keys(properties)
					.filter(key => key !== 'text' && key !== 'facsimiles' && key !== 'id')
					.map(key => {
						let mdConfig = config.metadata.find(md => md.id === key)
						if (mdConfig == null) config.textData.find(td => td.id === key)
						if (mdConfig == null) mdConfig = {
							...defaultMetadata,
							id: key
						}
						return mdConfig
					})
					.filter(field => field.datatype !== EsDataType.Null && field.datatype !== EsDataType.Text )
					.sort((f1, f2) => f1.order - f2.order)
				setFields(tmpFields)
			})
			.catch(err => console.log(err))
	}, [config.slug])
	
	return fields
}

export default function Search(props: FileExplorerProps) {
	const fields = useFields(props.config)

	return (
		<FS
			disableDefaultStyle={props.searchTab === SearchTab.Results}
			fields={fields}
			ResultBodyComponent={GenericResultBodyComponent}
			onClickResult={result => props.setEntry(result.id)}
			resultBodyProps={{
				activeId: props.entry == null ? null : props.entry.id,
				searchTab: props.searchTab,
				viewport: props.viewport,
			}}
			resultsPerPage={props.config.searchResultCount}
			url={`/search/${props.config.slug}/_search`}
		/>
	)
}
