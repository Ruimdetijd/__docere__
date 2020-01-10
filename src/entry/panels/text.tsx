import * as React from 'react'
import DocereTextView from 'docere-text-view'
import { TextWrapper, Text } from '../index.components'
import { fetchPost } from '../../utils'

class TextPanel extends React.PureComponent<TextPanelProps> {
	private textRef: React.RefObject<HTMLDivElement>

	async componentDidMount() {
		if (this.props.searchQuery != null) this.setHighlight()
	}

	componentDidUpdate(prevProps: TextPanelProps) {
		if (prevProps.highlight.length && !this.props.highlight.length) {
			for (const el of this.textRef.current.querySelectorAll('mark')) {
				el.replaceWith(...el.childNodes)
			} 
		}
		if (prevProps.searchQuery !== this.props.searchQuery) this.setHighlight()
	}

	render() {
		const textLayer = this.props.entry.textLayers.find(tl => tl.id === this.props.textLayerConfig.id)

		return (
			<TextWrapper>
				<Text 
					hasLb={this.props.configData.components.hasOwnProperty('lb')}
					hasFacs={this.props.configData.extractFacsimiles != null}
					hasScroll={this.props.hasScroll}
					ref={this.textRef}
				>
					<DocereTextView
						customProps={this.props.customProps}
						components={this.props.configData.components}
						node={textLayer.element}
						highlight={this.props.highlight}
					/>
				</Text>
			</TextWrapper>
		)
	}

	private async setHighlight() {
		const response = await fetchPost(`/search/${this.props.configData.config.slug}/_search`, {
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
								id: this.props.entry.id
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
