import * as React from 'react'
import DocereTextView from 'docere-text-view'
import { TextWrapper, Menu, Text, WordWrapButton, OrientationButton } from '../index.components'
import { TEXT_PANEL_WIDTH } from '../../constants'
import { getEntryXmlPath, fetchPost } from '../../utils'
import { PanelsProps, PanelsState } from './index'

interface Props extends PanelsProps, PanelsState {
	customProps: DocereComponentProps
	textLayerConfig: TextLayerConfig
}
class TextPanel extends React.PureComponent<Props> {
	private textRef: React.RefObject<HTMLDivElement>

	async componentDidMount() {
		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.highlight.length && !this.props.highlight.length) {
			for (const el of this.textRef.current.querySelectorAll('mark')) {
				el.replaceWith(...el.childNodes)
			} 
		}
		if (prevProps.searchQuery !== this.props.searchQuery) this.setHighlight()
	}

	public render() {
		const node = (this.props.textLayerConfig.selector != null) ?
			this.props.doc.querySelector(this.props.textLayerConfig.selector) :
			this.props.doc

		return (
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
							this.props.components.hasOwnProperty('lb') &&
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
						hasLb={this.props.components.hasOwnProperty('lb')}
						hasFacs={this.props.extractFacsimiles != null}
						hasScroll={this.props.hasScroll}
						ref={this.textRef}
						wordwrap={this.props.wordwrap}
					>
						<DocereTextView
							customProps={this.props.customProps}
							components={this.props.components}
							node={node}
							highlight={this.props.highlight}
						/>
					</Text>
				</div>
			</TextWrapper>
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

export default TextPanel
