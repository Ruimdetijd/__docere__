import * as React from 'react'
import { Wrapper } from './index'
import styled from '@emotion/styled'
import { ChangeButton, XmlOption, SelectButton, ExcludeButton, ReplaceButton, TextOption, DataOption } from './buttons'

const EmptyWrapper = styled(Wrapper)`
	border: 4px dashed rgba(165, 42, 42, .4);
	border-radius: 10px;
	height: calc(100px + 2em);
`

interface Props {
	onClick: () => void
	handlers: Handler[]
}
export default function(props: Props) {
	if (!props.handlers.length) return <EmptyWrapper onClick={props.onClick} />

	return (
		<Wrapper onClick={props.onClick}>
			{
				props.handlers.map((handler, index) => {
					// Transformers
					if (handler.type === 'change') return <ChangeButton key={index} />
					if (handler.type === 'select') return <SelectButton key={index} />
					if (handler.type === 'exclude') return <ExcludeButton key={index} />
					if (handler.type === 'replace') return <ReplaceButton key={index} />

					// Exporters
					if (handler.type === 'xml') return <XmlOption key={index} />
					if (handler.type === 'data') return <DataOption key={index} />
					if (handler.type === 'text') return <TextOption key={index} />
				})
			}
		</Wrapper>
	)
}