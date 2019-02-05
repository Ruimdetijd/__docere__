import * as React from 'react'
import { Link } from 'react-router-dom'
import { State as AppState } from '../index'

export default class Projects extends React.Component<AppState> {
	async componentDidMount() {
		this.props.setProjects()
	}

	render() {
		return (
			<>
				<h1>Projects</h1>
				<ul>
					{
						this.props.projects
							.sort((a, b) => {
								if (a.slug < b.slug) return -1
								if (a.slug > b.slug) return 1
								return 0
							})
							.map(project =>
								<li key={project.id}>
									<Link to={`/projects/${project.slug}`}>{project.title || project.slug}</Link>
								</li>
							)
					}
				</ul>
			</>
		)
	}
}