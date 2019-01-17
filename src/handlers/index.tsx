import * as React from 'react'
import styled from '@emotion/styled';
import AddHandler from './add-handler'
import XmlForm from './forms/xml'
import DataForm from './forms/data'
import TextForm from './forms/text'
import ExcludeForm from './forms/exclude'
import ReplaceForm from './forms/replace'
import ChangeForm from './forms/change'
import SelectForm from './forms/select'

export const Wrapper = styled('div')`
	grid-row-start: 3;
	grid-row-end: 4;
`

interface Props {
	change: (handlers: Handler[]) => void
	handlers: Handler[]
	type: 'transformers' | 'exporters'
}
export default class Handlers extends React.PureComponent<Props> {
	render() {
		return (
			<Wrapper>
				{
					this.props.handlers.map((handler, index) => {
						let Component
						if (handler.type === 'xml') Component = XmlForm
						if (handler.type === 'data') Component = DataForm
						if (handler.type === 'text') Component = TextForm
						if (handler.type === 'exclude') Component = ExcludeForm
						if (handler.type === 'replace') Component = ReplaceForm
						if (handler.type === 'change') Component = ChangeForm
						if (handler.type === 'select') Component = SelectForm

						return (
							<Component
								change={(nextProps: Partial<Handler>) => this.updateHandlers(nextProps, index)}
								close={() => this.removeHandler(index)}
								key={index}
								handler={handler}
							/>
						)
					})
				}
				<AddHandler
					change={this.addHandler}
					type={this.props.type}
				/>
			</Wrapper>	
		)
	}

	private addHandler = (handler: Handler) => {
		const handlers = this.props.type === 'exporters' ?
			this.props.handlers
				.map(h => {
					h.active = false
					return h
				}) :
			this.props.handlers
		this.props.change(handlers.concat(handler))
	}

	private updateHandlers(nextProps: Partial<Handler>, index: number) {
		const nextHandler: any = { ...this.props.handlers[index], ...nextProps }
		let handlers = this.props.handlers
			.slice(0, index)
			.concat(nextHandler)
			.concat(this.props.handlers.slice(index + 1))

		// Highlander
		if (this.props.type === 'exporters' && nextProps.hasOwnProperty('active') && nextProps.active) {
			handlers = handlers.map(h => {
				h.active = false
				return h
			})
			handlers[index].active = true
		}

		this.props.change(handlers)
	}

	private removeHandler(index: number) {
		this.props.change(this.props.handlers.filter((_t, i) => i !== index))
	}
}