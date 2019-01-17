import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Entry from './entry'
import Projects from './projects'
import Project from './project'
import { Project as ProjectModel } from './models'
import extractors from './entry/extractors'
import XMLio from 'xmlio';
import splitters from './project/splitters';
import { logMessage } from './log'

function fetchXml(slug: string, filename: string): Promise<XMLio> {
	return new Promise((resolve, _reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', `/api/xml/${slug}/${filename}.xml`)
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				const xmlio = new XMLio(xhr.responseXML.documentElement, { namespaces: ['af', 'md']})
				resolve(xmlio)
			}
		}

		xhr.send()
	})
}

export interface State {
	projects: ProjectModel[]
	project: ProjectModel
	setProject: (slug: string) => void
	setProjects: () => void
	setXml: (filename: string) => void
	xmlio: XMLio
}
class App extends React.Component<{}, State> {
	private setProjects = async () => {
		const response = await fetch(`/api/projects`)
		const projects = await response.json()
		this.setState({ projects })
	}

	state: State = {
		project: null,
		projects: [],
		setProjects: this.setProjects,
		setProject: async (slug: string) => {
			logMessage('setting project!!!')
			const project = this.state.projects.find(p => p.label === slug)
			logMessage(project)
			if (project != null && project.xml != null) {
				this.setState({ project }, () => logMessage('project set'))
			} else {
				logMessage('fetching project')
				const response = await fetch(`/api/projects/${slug}`)
				const project: ProjectModel = await response.json()
				logMessage('project fetched')
				const partialState = this.updateProject(project, {
					entries: {},
					extractors: extractors[project.label],
					splitter: splitters[project.label],
					xml: {}
				})
				this.setState(partialState, () => logMessage('project set'))
			}
		},
		setXml: async (filename: string) => {
			if (this.state.project == null) {
				console.error('PROJECT IS UNDEFINED')
				return
			}
			logMessage(this.state.project)

			logMessage('setting xml')
			if (this.state.project.xml.hasOwnProperty(filename)) {
				const xmlio = this.state.project.xml[filename]
				this.setState({ xmlio }, () => logMessage('xml set'))
			} else {
				logMessage('fetching XML')
				const xmlio = await fetchXml(this.state.project.label, filename)	
				logMessage('XML fetched')
				const xml = { ...this.state.project.xml, [filename]: xmlio }	

				let entries = {}
				if (splitters.hasOwnProperty(this.state.project.label)) {
					logMessage('Splitting XML')
					const splitted = splitters[this.state.project.label](xmlio) as Element[]
					entries = { ...this.state.project.entries, [filename]: splitted.map(s => new XMLio(s)) }
					logMessage('XML split')
				}

				const partialState = this.updateProject(this.state.project, { xml, entries })
				this.setState({ ...partialState, xmlio }, () => logMessage('xml set'))
			}
		},
		xmlio: null
	}

	private updateProject(prevProject: ProjectModel, props: Partial<ProjectModel>): Pick<State, 'project' | 'projects'> {
		logMessage('up proj')
		const project = { ...prevProject, ...props }	
		const projects = this.state.projects
			.filter(p => p.id !== project.id)
			.concat(project)
		logMessage('proj up')
		return { project, projects }
	}

	render() {
		return (
			<BrowserRouter>
				<>
					<Link to="/projects">Projects</Link>
					&nbsp;
					{
						this.state.project != null &&
						<Link to={`/projects/${this.state.project.label}`}>{this.state.project.label}</Link>
					}
					<Route path="/projects" exact render={() =>
						<Projects
							{...this.state}
						/>
					} />
					<Route path="/projects/:slug" exact render={props =>
						<Project
							{...props}
							{...this.state}
						/>
					} />
					<Route
						path="/projects/:projectSlug/xml/:xmlId"
						render={this.renderEntry}
					/>
					<Route
						path="/projects/:projectSlug/xml/:xmlId/entries/:entryId"
						render={this.renderEntry}
					/>
				</>
			</BrowserRouter>
		)
	}

	private renderEntry = (props) => {
		return (
			<Entry
				{...props}
				{...this.state}
			/>
		)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container')
	ReactDOM.render(<App />, container)
});