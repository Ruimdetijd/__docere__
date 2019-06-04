import * as React from 'react'
import styled from '@emotion/styled'
import { defaultMetadata } from 'docere-config'
import { DEFAULT_SPACING, TOP_OFFSET } from '../../constants';
import { MetadataItem } from '../index.components'

const Wrapper = styled.ul`
	box-sizing: border-box;
	height: calc(100vh - ${TOP_OFFSET}px);
	overflow-y: auto;
	padding: ${DEFAULT_SPACING}px;
`

interface Props {
	metadata: ExtractedMetadata
}
export default function MetadataAside(props: Props) {
	return (
		<Wrapper>
			{
				props.metadata
					.map(([id, value]) => {
						const data = config.metadata.find(md => md.id === id)
						if (data == null) return { ...defaultMetadata, title: id, value }
						else return { ...defaultMetadata, ...data, value }

					})
					.filter(data => data.aside)
					.map((data, index) => {
						return (
							<MetadataItem key={index}>
								<span>{data.title || data.id}</span>
								<span>{data.value}</span>
							</MetadataItem>
						)
					})
			}	
		</Wrapper>

	)
}
