import * as React from 'react'
import styled from '@emotion/styled'
import { defaultMetadata } from 'docere-config'
import { DEFAULT_SPACING, TOP_OFFSET } from '../../constants';
import { MetadataItem } from '../index.components'

interface WProps { active: boolean }
const Wrapper = styled.ul`
	box-sizing: border-box;
	height: calc(100vh - ${TOP_OFFSET}px);
	overflow-y: auto;
	padding: ${DEFAULT_SPACING}px;
	position: absolute;
	z-index: ${(p: WProps) => p.active ? 1 : -1}
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`

interface Props extends WProps {
	config: AppState['config']
	metadata: ExtractedMetadata
}
export default function MetadataAside(props: Props) {
	return (
		<Wrapper active={props.active}>
			{
				Object.keys(props.metadata)
					.map(id => {
						const data = props.config.metadata.find(md => md.id === id)
						const value = props.metadata[id]
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
