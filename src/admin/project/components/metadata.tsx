import * as React from 'react'
import styled from '@emotion/styled';
import { MetadataField } from '../../../models'
import { fetchPut } from '../../../utils'
import { Props } from '../main'
import FieldForm from './field-form'

const Ul = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 4fr 16fr 16fr 8fr 48px;
	grid-column-gap: 24px;

	li:first-of-type {
		grid-column: 4;
	}
`

interface State {
	dragging: MetadataField
	metadataFields: MetadataField[]
}
export default class Metadata extends React.PureComponent<Props, State> {
	moved = 0
	state: State = {
		dragging: null,
		metadataFields: this.props.project.metadata_fields
	}

	componentDidMount() {
		document.addEventListener('mouseup', () => {
			if (this.state.dragging != null) {
				this.moved = 0
				this.setState({ dragging: null })
			}
		})
	}

	// componentDidUpdate(_prevProps: Props, prevState: State) {
	// }

	render() {
		return (
			<section style={{ userSelect: 'none' }}>
				<Ul>
					<li>type</li>
					<li>slug</li>
					<li>title</li>
					<li>data type</li>
					<li>aside</li>
				</Ul>
				<ul
					onMouseMove={(ev) => {

						if (this.state.dragging) {
							this.handleDrag(ev)
						}
					}}
				>
					{
						this.state.metadataFields
							.sort((f1, f2) => f1.sortorder - f2.sortorder)
							.map((field, _index) =>
								<FieldForm
									active={this.state.dragging === field}
									onMouseDown={() => {
										this.setState({ dragging: field })
									}}
									field={field}
									key={field.slug}
									moveToFirst={() => this.moveTo(field.id, 'first')}
									moveToLast={() => this.moveTo(field.id, 'last')}
								/>
							)
					}
				</ul>
			</section>
		)	
	}

	private moveTo(fieldId: string, place: 'first' | 'last') {
		const found = this.state.metadataFields.find(f => f.id === fieldId)
		const rest = this.state.metadataFields.filter(f => f.id !== fieldId)
		const metadataFields = (place === 'first' ? [found].concat(rest) : rest.concat(found))
		this.updateMetadataFields(metadataFields)
	}

	private handleDrag(ev: React.MouseEvent<HTMLUListElement>) {
		this.moved += ev.movementY
		const orderOffset = Math.round(this.moved/64)
		if (orderOffset !== 0) {
			const fromIndex = this.state.dragging.sortorder - 1
			const toIndex = fromIndex + orderOffset

			const arr = this.state.metadataFields
			var element = arr[fromIndex];
			arr.splice(fromIndex, 1);
			arr.splice(toIndex, 0, element);

			const nextMetadataFields = arr
				.map((f, i) => {
					return {
						...f,
						sortorder: i + 1
					}
				})

			const nextField = nextMetadataFields[toIndex]

			this.saveDiff(nextMetadataFields)
			this.setState(() => ({ metadataFields: nextMetadataFields, dragging: nextField }))
			this.moved = 0
		}
	}

	private updateMetadataFields(nextMetadataFields: MetadataField[], nextState: Partial<State> = {}) {
		const metadataFields = nextMetadataFields.map((f, i) => ({ ...f, sortorder: i + 1 }))
		this.saveDiff(metadataFields)
		this.setState({ metadataFields, ...nextState as State })
	}

	private saveDiff(nextMetadataFields: MetadataField[]) {
		if (this.state.metadataFields !== nextMetadataFields) {
			const prevMap = this.state.metadataFields.reduce((prev, curr) => {
				prev[curr.id] = curr.sortorder
				return prev
			}, {})

			const changed = nextMetadataFields
				.filter(f =>
					f.sortorder !== prevMap[f.id]
				)
				.map(f => [f.id, f.sortorder])
			
			fetchPut(`/api/metadata/sortorder`, changed)
		}
	}
}