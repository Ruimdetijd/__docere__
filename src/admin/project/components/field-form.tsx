import * as React from 'react'
import Input from '../../../ui/input'
import Select from '../../../ui/select'
import Toggle from '../../../ui/toggle'
import { MetadataField, EsDataType } from '../../../models'
import styled from '@emotion/styled'
import { fetchPut, debounce } from '../../../utils';
fetchPut

const Cell = styled.div`
	align-self: center;
`

const Move = styled(Cell)`
	cursor: pointer;
	justify-self: center;
	transform: rotate(90deg);
`

const Handle = styled(Cell)`
	cursor: move;
	justify-self: center;
`

const Li = styled.li`
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 4fr 16fr 16fr 8fr 48px;
	grid-column-gap: 24px;
	height: 64px;
`

type Props = {
	active: boolean
	field: MetadataField
	moveToFirst: () => void
	moveToLast: () => void
	onMouseDown: (ev: React.MouseEvent<HTMLDivElement>) => void
}

type State = Pick<MetadataField, 'es_data_type' | 'title' | 'aside'>
export default class FieldFrom extends React.PureComponent<Props, State> {
	state: State = {
		aside: this.props.field.aside,
		es_data_type: this.props.field.es_data_type,
		title: this.props.field.title,
	}

	componentDidUpdate(prevProps: Props) {
		const { aside, es_data_type, title } = prevProps.field
		const nextState: Partial<State> = {}
		if (aside !== this.props.field.aside) nextState.aside = this.props.field.aside
		if (es_data_type !== this.props.field.es_data_type) nextState.es_data_type = this.props.field.es_data_type
		if (title !== this.props.field.title) nextState.title = this.props.field.title
		if (Object.keys(nextState).length) this.setState(nextState as State)
	}

	render() {
		return (
			<Li>
				<Handle onMouseDown={this.props.onMouseDown}>☰</Handle>
				<Move onClick={this.props.moveToFirst}>≪</Move>
				<Move onClick={this.props.moveToLast}>≫</Move>
				<Cell>{this.props.field.type}</Cell>
				<Cell>{this.props.field.slug}</Cell>
				<Input
					change={this.updateState('title')}
					label="title"
					value={this.state.title}
				/>
				<Select
					change={this.updateState('es_data_type')}
					options={Object.keys(EsDataType)}
					value={this.state.es_data_type}
				/>
				<Toggle
					change={this.updateState('aside')}
					value={this.state.aside}
				/>
			</Li>	
		)
	}


	private updateState = (prop: keyof MetadataField) => (value: any) => {
		this.setState({ [prop]: value } as any)
		this.debouncedUpdateState()
	}

	private debouncedUpdateState = debounce(() => {
		fetchPut(
			`/api/metadata/${this.props.field.id}`,
			this.state
		)
	}, 1000)
}