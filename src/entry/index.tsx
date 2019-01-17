import * as React from 'react'
import { Main, H1, MetadataItem } from './index.components'
import ExtractedItems from '../components/extracted-items'
import defaultState from './state'
import XMLio from 'xmlio'
import components from '../components'
import styled from '@emotion/styled'
import { generateId } from '../utils'
import { RouteComponentProps } from 'react-router'
import { State as AppState } from '../index'
import { Entry as EntryModel } from '../models'
import metadataBySlug from './metadata'

export const ID_ATTRIBUTE_NAME = '__id'
export const COLOR_ATTRIBUTE_NAME = '__color'

function Noop(props) {
	return props.children
}

const TextWrapper = styled.div`
	counter-reset: linenumber;
	font-size: 1.2em;
	line-height: 1.5em;
	padding-left: 2em;
	position: relative;
`

interface MatchParams {
	entryId: string
	projectSlug: string
	xmlId: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
	setEntry: (entry: EntryModel) => void
}
export default class Entry extends React.Component<Props, ContextState> {
	state: ContextState = defaultState
	components = components

	async componentDidMount() {
		await this.props.setProject(this.props.match.params.projectSlug)
		await this.props.setXml(this.props.match.params.xmlId)
	}

	shouldComponentUpdate(_nextProps: Props, nextState: ContextState) {
		return this.state.dataNodeTree == null || this.state.dataNodeTree !== nextState.dataNodeTree
	}

	componentDidUpdate(prevProps: Props, _prevState: ContextState) {
		if (prevProps.xmlio !== this.props.xmlio) {
			this.init(this.props.xmlio)	
		}
	}

	render() {
		if (this.state.dataNodeTree == null) return null

		const component = this.dataToComponent(this.state.dataNodeTree)
		
		return (
			<Main>
				<H1>NINEVEH<small>Digital Scholarly Editions</small></H1>
				<aside>
					<ul>
						{
							this.state.metadata
								.map(([key, value]) => 
									<MetadataItem key={key}>
										<span>{key}</span>
										<span>{value}</span>
									</MetadataItem>
								)
						}	
					</ul>
				</aside>
				<TextWrapper>
					{ component }
				</TextWrapper>
				<aside>
					{
						this.state.extractors.map(extractor =>
							<ExtractedItems
								activeId={this.state.activeId}
								extractor={extractor}
								key={extractor.id}
								onClick={(activeId: string) => this.setState({ activeId })}
							/>
						)
					}
				</aside>
			</Main>
		)
	}

	private init(xmlio: XMLio) {
		this.props.project.extractors.forEach(extractor => {
			// Add a cache for used IDs. When a used ID is encountered,
			// the same internal ID is used.
			const cache = new Map()
			xmlio.change(extractor.selector, (el: HTMLElement) => {
				const id = el.getAttribute(extractor.idAttribute)

				// Create an internal ID, to match a component to a node (and vice versa).
				// Ideally, extractor.idAttribute would be used, but this is not possible,
				// because two IDs from different extractors could be the same, for example:
				// "paris" for a person and a place
				const internalId = cache.has(id) ? cache.get(id) : generateId(6)
				cache.set(id, internalId)
				el.setAttribute(ID_ATTRIBUTE_NAME, internalId)
				el.setAttribute(COLOR_ATTRIBUTE_NAME, extractor.color)
				return el
			})
		})
		xmlio.persist()

		// Create a map of extracted items by extractor ID
		const extractors = this.props.project.extractors.map(extractor => {
			// Select the nodes from the DOM
			let nodes = xmlio
				.select(extractor.selector)
				.export({ type: 'data', deep: false })

			if (nodes == null) {
				extractor.items = []
				return extractor
			}

			if (!Array.isArray(nodes) && nodes.hasOwnProperty('name')) {
				nodes = [nodes]
			}

			// Reduce the nodes to ExtractedItems
			const mapValues = (nodes as DataNode[])
				.reduce((prev, curr) => {
					const attrName = extractor.idAttribute
					const idAttrValue = curr.attributes[attrName]

					// If the ID attr does not exist on the Map, add it
					if (!prev.has(idAttrValue)) {
						prev.set(idAttrValue, {
							count: 1,
							node: curr,
							id: idAttrValue,
						})
					// If the ID attr does exist, update the count
					} else {
						const tmp = prev.get(idAttrValue)
						prev.set(idAttrValue, {
							...tmp,
							count: tmp.count + 1,
						})
					}
					return prev
				}, new Map<string, ExtractedItem>())
				.values()

			// Change MapIterator to Array, and add array to map
			extractor.items = Array.from(mapValues)

			return extractor
		})


		const dataNodeTree = xmlio.exclude(['note']).export({ type: 'data' }) as DataNode
		const metadata: Metadata = metadataBySlug[this.props.project.label](xmlio)

		this.setState({ dataNodeTree, extractors, metadata })
	}

	private handleComponentClick(ev: MouseEvent, data: DataNode) {
		ev.stopPropagation()
		if (data.attributes.hasOwnProperty(ID_ATTRIBUTE_NAME)) this.setState({ activeId: data.attributes[ID_ATTRIBUTE_NAME] })
	}

	private dataToComponent(root: DataNode, index?: number): any {
		// If root is null or undefined, return null, which is a valid output for a React.Component
		if (root == null) return null

		// If root is a string, just return the string, which is a valid child for a React.Component
		if (typeof root === 'string') return root

		// If there is no predefined React.Component, use the Noop (no-op, no operation) Component,
		// which just returns it's children
		if (!this.components.hasOwnProperty(root.name)) this.components[root.name] = Noop

		// If root does not have children, add an empty array, so it can be `map`ed
		if (root.children == null) root.children = []

		// Set the default attributes. React expects a key for siblings. Plus, some event handlers.
		const defaultAttributes = {
			activeId: this.state.activeId,
			key: index,
			onClick: (ev: MouseEvent) => this.handleComponentClick(ev, root)
		}

		// Create the React.Component
		return React.createElement(
			this.components[root.name], // Component class
			{ ...root.attributes, ...defaultAttributes }, // Attributes
			root.children.map((child, index) => this.dataToComponent(child, index)) // Children
		)
	}
}