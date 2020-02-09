// import * as React from 'react'
// import { BooleanFacet, ListFacet, RangeFacet } from 'huc-faceted-search'

// function formatTitle(facetFields: MetaDataConfig) {
// 	const title = facetFields.title || facetFields.id
// 	return title.replace(/_/ug, ' ').toUpperCase()
// }

// export default function fieldToFacet(field: MetaDataConfig) {
// 	if (field.datatype === EsDataType.boolean) {
// 		return (
// 			<BooleanFacet
// 				field={field.id}
// 				key={field.id}
// 				labels={{ false: "Nee", true: "Ja" }}
// 				title={formatTitle(field)}
// 			/>
// 		)

// 	}

// 	if (field.datatype === EsDataType.date) {
// 		return (
// 			<RangeFacet
// 				field={field.id}
// 				key={field.id}
// 				title={formatTitle(field)}
// 				type="timestamp"
// 			/>
// 		)
// 	}

// 	if (field.datatype === EsDataType.keyword) {
// 		return (
// 			<ListFacet
// 				field={field.id}
// 				key={field.id}
// 				size={field.size}
// 				title={formatTitle(field)}
// 			/>
// 		)
// 	}

// 	return null
// }
