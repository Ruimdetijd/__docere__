import * as React from 'react'
import components from '../components'
import { RouteComponentProps } from 'react-router'
import DocereTextView from 'docere-text-view'
import { fetchPost } from '../utils'
import { Main, Panels, TextWrapper, Menu, Text, WordWrapButton, OrientationButton } from './index.components'
import Aside from './aside'
import Facsimile from './facsimile'
import { TEXT_PANEL_WIDTH } from '../constants';

export enum TabName { Metadata = 'Metadata', TextData = 'TextData' }

function getXmlFilePath(slug: string, filename: string) {
	return `/node_modules/docere-config/projects/${slug}/xml/${filename}.xml`
}
function fetchXml(slug: string, filename: string): Promise<XMLDocument> {
	return new Promise((resolve, _reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', getXmlFilePath(slug, filename))
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve(xhr.responseXML)
			}
		}

		xhr.send()
	})
}

interface MatchParams {
	entryId: string
	projectSlug: string
	xmlId: string
}
export type Props = AppState & RouteComponentProps<MatchParams>
export interface State {
	activeFacsimilePath: string
	activeId: string
	activeListId: string
	activeTab: TabName
	doc: XMLDocument
	hasScroll: boolean
	highlight: string[]
	input: string
	metadata: ExtractedMetadata
	orientation: Orientation
	wordwrap: boolean
}

export default class Entry extends React.Component<Props, State> {
	private components = components
	private textRef: React.RefObject<HTMLDivElement>

	state: State = {
		activeFacsimilePath: null,
		activeId: null,
		activeListId: config.textdata[0].id,
		activeTab: TabName.Metadata,
		doc: null,
		hasScroll: false,
		highlight: [],
		input: null,
		metadata: [],
		orientation: Orientation.Horizontal,
		wordwrap: false,
	}

	async componentDidMount() {
		const { xmlId } = this.props.match.params

		await import(`../components/${config.slug}`).then(components => {
			this.components = {...this.components, ...components.default}
			this.forceUpdate()
		})

		let doc = await fetchXml(config.slug, xmlId)
		doc = prepareDocument(doc, config)

		const facsimiles = extractFacsimiles(doc)
		const metadata = extractMetadata(doc)
		this.setState({
			doc,
			activeFacsimilePath: facsimiles.facsimiles[0].path,
			metadata
		})

		const hasScroll = window.innerHeight < document.documentElement.scrollHeight
		if (hasScroll) this.setState({ hasScroll })

		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.searchQuery !== this.props.searchQuery) {
			this.setHighlight()
		}
		
		if (prevState.highlight.length && !this.state.highlight.length) {
			for (const el of this.textRef.current.querySelectorAll('mark')) {
				el.replaceWith(...el.childNodes)
			} 
		}
	}

	render() {
		if (this.state.doc == null) return null

		return (
			<Main asideVisible={this.state.activeTab != null}>
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
									href={getXmlFilePath(config.slug, this.props.match.params.xmlId)}
								>
									<img src="https://tei-c.org/Vault/Logos/TEIlogo.svg" width="32px" />
								</a>
								{
									this.components.hasOwnProperty('lb') &&
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
								hasLb={this.components.hasOwnProperty('lb')}
								hasFacs={extractFacsimiles != null}
								hasScroll={this.state.hasScroll}
								ref={this.textRef}
								wordwrap={this.state.wordwrap}
							>
								<DocereTextView
									customProps={{
										activeFacsimilePath: this.state.activeFacsimilePath,
										activeId: this.state.activeId,
										activeListId: this.state.activeListId,
										activeTab: this.state.activeTab,
										setActiveFacsimile: (activeFacsimilePath: string) => this.setState({ activeFacsimilePath }),
										setActiveId: this.setActiveId,
									}}
									components={this.components}
									node={this.state.doc}
									highlight={this.state.highlight}
								/>
							</Text>
						</div>
					</TextWrapper>
				</Panels>
				<Aside
					{...this.state}
					onClick={this.setActiveId}
					setActiveTab={activeTab => {
						if (activeTab === this.state.activeTab) activeTab = null
						this.setState({ activeTab, activeId: null })
					}}
				/>
			</Main>
		)
	}

	private setActiveId = (activeListId: string, activeId: string) => {
		if (activeListId === this.state.activeListId && activeId === this.state.activeId) activeId = null
		this.setState({ activeId, activeListId })
	}

	private async setHighlight() {
		const response = await fetchPost(`/search/${config.slug}/_search`, {
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
								id: this.props.match.params.xmlId
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
