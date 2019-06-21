import * as React from 'react'
import { State as EntryState } from '../index'
import Facsimile from './facsimile'
import DocereTextView from 'docere-text-view'

import { TextWrapper, Menu, Text, WordWrapButton, OrientationButton, PanelsWrapper } from '../index.components'
import { TEXT_PANEL_WIDTH, Viewport } from '../../constants'
import { getEntryXmlPath, fetchPost } from '../../utils'

type Props = AppState & EntryState & {
	setActiveId: (activeListId: string, activeId: string) => void
	setActiveFacsimile: (path: string) => void
	togglePanelOrientation: () => void
	toggleWordWrap: () => void
}
interface State {
	components: DocereComponents
	highlight: string[]
}
export default class Panels extends React.Component<Props, State> {
	private textRef: React.RefObject<HTMLDivElement>

	state: State = {
		components: {},
		highlight: [],
	}

	async componentDidMount() {
		const { default: getComponents } = await import(`../../project-components/${this.props.config.slug}`) as { default : FunctionTypes['getComponents'] }
		const components = getComponents(this.props.config)
		this.setState({ components })

		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.searchQuery !== this.props.searchQuery) this.setHighlight()
		if (prevState.highlight.length && !this.state.highlight.length) {
			for (const el of this.textRef.current.querySelectorAll('mark')) {
				el.replaceWith(...el.childNodes)
			} 
		}
	}

	shouldComponentUpdate(nextProps: Props) {
		// Only update when the viewport has not changed
		return this.props.viewport === nextProps.viewport ||
			this.props.viewport === Viewport.TextData ||
			nextProps.viewport === Viewport.TextData
	}

	render() {
		const customProps: DocereComponentProps = {
			activeFacsimilePath: this.props.activeFacsimilePath,
			activeId: this.props.activeId,
			activeListId: this.props.activeListId,
			config: this.props.config,
			setActiveFacsimile: this.props.setActiveFacsimile,
			setActiveId: this.props.setActiveId,
			viewport: this.props.viewport,
		}

		return (
			<PanelsWrapper orientation={this.props.orientation}>
				<Facsimile
					activeFacsimilePath={this.props.activeFacsimilePath}
					orientation={this.props.orientation}
				/>
				<TextWrapper orientation={this.props.orientation}>
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
									onClick={this.props.toggleWordWrap}
									wordwrap={this.props.wordwrap}
								/>
							}
							<OrientationButton
								onClick={this.props.togglePanelOrientation}
								orientation={this.props.orientation}
							/>
						</div>
					</Menu>
					<div style={{ display: 'grid', gridTemplateColumns: `auto ${TEXT_PANEL_WIDTH}px auto` }}>
						<Text 
							hasLb={this.state.components.hasOwnProperty('lb')}
							hasFacs={this.props.extractFacsimiles != null}
							hasScroll={this.props.hasScroll}
							ref={this.textRef}
							wordwrap={this.props.wordwrap}
						>
							<DocereTextView
								customProps={customProps}
								components={this.state.components}
								node={this.props.doc}
								highlight={this.state.highlight}
							/>
						</Text>
					</div>
				</TextWrapper>
			</PanelsWrapper>
		)
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
