import { excludeBlue, replaceOrange, selectGreen, changePurple, exporterGray } from '../css'
import styled from '@emotion/styled'
import { Button } from '../ui/button'

// Transformers
export const ExcludeButton = styled(Button)`
	${excludeBlue}
`

export const ReplaceButton = styled(Button)`
	${replaceOrange}
`

export const SelectButton = styled(Button)`
	${selectGreen}
`

export const ChangeButton = styled(Button)`
	${changePurple}
`

// Exporters
export const XmlOption = styled(Button)`
	${exporterGray}
`

export const DataOption = styled(Button)`
	${exporterGray}
`

export const TextOption = styled(Button)`
	${exporterGray}
`