import * as React from 'react'
import DocereTextView from 'docere-text-view'

import { TEXT_PANEL_WIDTH } from '../constants'
import { fetchPost, getEntryXmlPath, fetchEntryXml } from '../utils'

import { Main, Panels, TextWrapper, Menu, Text, WordWrapButton, OrientationButton } from './index.components'
import Aside from './aside'
import Facsimile from './facsimile'

export interface State {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	components: DocereComponents
	doc: XMLDocument
	hasScroll: boolean
	highlight: string[]
	input: string
	metadata: ExtractedMetadata
	orientation: Orientation
	wordwrap: boolean
}

export default class Entry extends React.Component<AppState, State> {
	private textRef: React.RefObject<HTMLDivElement>

	state: State = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: this.props.config.textdata.length ? this.props.config.textdata[0].id : null,
		components: {},
		doc: null,
		hasScroll: false,
		highlight: [],
		input: null,
		metadata: {},
		orientation: Orientation.Horizontal,
		wordwrap: false,
	}

	async componentDidMount() {
		const { default: getComponents } = await import(`../project-components/${this.props.config.slug}`) as { default : FunctionTypes['getComponents'] }
		const components = getComponents(this.props.config)
		this.setState({ components })

		await this.loadDoc()

		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: AppState, prevState: State) {
		if (prevProps.entryId !== this.props.entryId) this.loadDoc()
		if (prevProps.searchQuery !== this.props.searchQuery) this.setHighlight()
		if (prevProps.viewport !== this.props.viewport) this.setState({ activeId: null })
		
		if (prevState.highlight.length && !this.state.highlight.length) {
			for (const el of this.textRef.current.querySelectorAll('mark')) {
				el.replaceWith(...el.childNodes)
			} 
		}
	}

	render() {
		if (this.state.doc == null) return null

		const customProps: DocereComponentProps = {
			activeFacsimilePath: this.state.activeFacsimilePath,
			activeId: this.state.activeId,
			activeListId: this.state.activeListId,
			config: this.props.config,
			setActiveFacsimile: (activeFacsimilePath: string) => this.setState({ activeFacsimilePath }),
			setActiveId: this.setActiveId,
			viewport: this.props.viewport,
		}

		return (
			<Main
				viewport={this.props.viewport}
			>
				<Panels orientation={this.state.orientation}>
					<Facsimile
						activeFacsimilePath={this.state.activeFacsimilePath}
						orientation={this.state.orientation}
					/>
					<TextWrapper orientation={this.state.orientation}>
						<Menu>
							<div>
								
							</div>
							<div>
								<a
									download="test.xml"
									href={getEntryXmlPath(this.props.config.slug, this.props.entryId)}
								>
									<img src="https://tei-c.org/Vault/Logos/TEIlogo.svg" width="32px" />
								</a>
								{
									this.state.components.hasOwnProperty('lb') &&
									<WordWrapButton
										onClick={() => this.setState({ wordwrap: !this.state.wordwrap })}
										wordwrap={this.state.wordwrap}
									/>
								}
								<OrientationButton
									onClick={() => {
										this.setState({
											orientation: this.state.orientation === Orientation.Horizontal ?
												Orientation.Vertical : Orientation.Horizontal
										})
									}}
									orientation={this.state.orientation}
								/>
							</div>
						</Menu>
						<div style={{ display: 'grid', gridTemplateColumns: `auto ${TEXT_PANEL_WIDTH}px auto` }}>
							<Text 
								hasLb={this.state.components.hasOwnProperty('lb')}
								hasFacs={this.props.extractFacsimiles != null}
								hasScroll={this.state.hasScroll}
								ref={this.textRef}
								wordwrap={this.state.wordwrap}
							>
								<DocereTextView
									customProps={customProps}
									components={this.state.components}
									node={this.state.doc}
									highlight={this.state.highlight}
								/>
							</Text>
						</div>
					</TextWrapper>
				</Panels>
				<Aside
					{...this.props}
					{...this.state}
					setActiveId={this.setActiveId}
				/>
			</Main>
		)
	}

	private setActiveId = (activeListId: string, activeId: string) => {
		if (activeListId === this.state.activeListId && activeId === this.state.activeId) activeId = null
		this.setState({ activeId, activeListId })
	}

	private async loadDoc() {
		let doc = await fetchEntryXml(this.props.config.slug, this.props.entryId)
		doc = this.props.prepareDocument(doc, this.props.config)

		const facsimiles = this.props.extractFacsimiles(doc)
		const metadata = this.props.extractMetadata(doc)
		this.setState({
			doc,
			activeFacsimilePath: facsimiles.length ? facsimiles[0].path : null,
			metadata
		})

		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		if (hasScroll) this.setState({ hasScroll })
	}

	private async setHighlight() {
		const response = await fetchPost(`/search/${this.props.config.slug}/_search`, {
			_source: false,
			query: {
				bool: {
					must: [
						{
							query_string: {
								query: this.props.searchQuery
							}
						},
						{
							match: {
								id: this.props.entryId
							}
						}
					]
				}
			},
			highlight: {
				fields: {
					text: {}
				},
				require_field_match: false,
				fragment_size: 0,
				number_of_fragments: 1000
			}
		})

		let hits = []
		if (!response.hasOwnProperty('error') && response.hits.hits.length) {
			hits = response.hits.hits[0].highlight.text.reduce((set: Set<string>, hit: string) => {
				hit = hit.slice(hit.indexOf('<em>') + 4, hit.indexOf('</em>'))
				set.add(hit)
				return set
			}, new Set())
		}

		this.setState({ highlight: [...hits] })
	}
}
