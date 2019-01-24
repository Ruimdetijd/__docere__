import * as React from 'react'
import { Link } from 'react-router-dom'
import { State as AppState } from '../index'
import { RouteComponentProps } from 'react-router'
import splitters from './splitters'

interface MatchParams {
	slug: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
}
interface State {
	filename: string
}
export default class Project extends React.Component<Props, State> {
	state: State = {
		filename: null
	}

	async componentDidMount() {
		this.props.setProject(this.props.match.params.slug)
	}

	render() {
		if (this.props.project == null) return null

		return (
			<>
				<h1>{`Project: ${this.props.project.title}`}</h1>
				<h2>XML documents</h2>
				<ul>
					{
						this.props.project.files.map(filename =>
							<li key={filename}>
								<Link to={`/projects/${this.props.project.slug}/xml/${filename}`}>{filename}</Link>
								{
									splitters.hasOwnProperty(this.props.project.slug) &&
									<span
										onClick={() => {
											this.setState({ filename })
											this.props.setXml(this.props.match.params.slug, filename)
										}}
									>
										split
									</span>
								}
								{
									this.props.project.xml.hasOwnProperty(filename) &&
									<span>{this.props.project.xml[filename].size}</span>
								}
							</li>
						)
					}
				</ul>
				{
					splitters.hasOwnProperty(this.props.project.slug) &&
					this.state.filename != null &&
					this.props.project.entries.hasOwnProperty(this.state.filename) &&
					this.props.project.entries[this.state.filename].length &&
					<>
						<h2>Entries</h2>
						<ul>
							{
								this.props.project.entries[this.state.filename].map((_xmlio, index) =>
									<li key={index}>
										<Link to={`/projects/${this.props.project.slug}/xml/${this.state.filename}/entries/${index}`}>{index}</Link>
									</li>
								)
							}
						</ul>
					</>
				}
			</>
		)
	}
}