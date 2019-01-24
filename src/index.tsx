import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Entry from './entry'
import Projects from './projects'
import Project from './project'
import { Project as ProjectModel, XMLData } from './models'
import extractors from './entry/extractors'
import XMLio from 'xmlio';
import splitters from './project/splitters'

function formatBytes(a: any) {
	var c=1024,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
	const num = (a/Math.pow(c,f))
	const d = num < 10 ? 1 : 0
	return parseFloat(num.toFixed(d))+e[f]
}

function fetchXml(slug: string, filename: string): Promise<XMLData> {
	return new Promise((resolve, _reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', `/api/xml/${slug}/${filename}.xml`)
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				const size = formatBytes(xhr.getResponseHeader('Content-length'))
				const xmlio = new XMLio(xhr.responseXML.documentElement, { namespaces: ['af', 'md']})
				resolve({ xmlio, size })
			}
		}

		xhr.send()
	})
}

export interface State {
	projects: ProjectModel[]
	project: ProjectModel
	setEntry: (slug: string, xmlId: string, entryId: string) => void
	setProject: (slug: string) => void
	setProjects: () => void
	setXml: (slug: string, filename: string) => void
	xmlio: XMLio
}
class App extends React.Component<{}, State> {
	private async ensureProjects(): Promise<Pick<State, 'projects'>> {
		const response = await fetch(`/api/projects`)
		const projects = await response.json()
		return { projects }
	}

	private async ensureProject(slug: string): Promise<Partial<State>> {
		const nextState: Partial<State> = {}

		if (!this.state.projects.length) {
			const { projects } = await this.ensureProjects()
			nextState.projects = projects
		}

		const projects = nextState.hasOwnProperty('projects') ? nextState.projects : this.state.projects
		const project = projects.find(p => p.slug === slug)
		if (project.xml != null) return project.slug === slug ? {} : { project }

		const response = await fetch(`/api/projects/${slug}`)
		const nextProject: ProjectModel = await response.json()
		const partialState = this.updateProject(nextProject, {
			entries: {},
			extractors: extractors[project.slug],
			splitter: splitters[project.slug],
			xml: {}
		})

		return partialState
	}

	private async ensureXml(slug: string, filename: string): Promise<Partial<State>> {
		const nextState = await this.ensureProject(slug)
		const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project

		if (project.xml.hasOwnProperty(filename)) {
			const { xmlio } = project.xml[filename]
			return (xmlio !== this.state.xmlio) ? { xmlio } : {}
		}

		const xmlData = await fetchXml(project.slug, filename)	
		const xml = { ...project.xml, [filename]: xmlData }	

		let entries = {}
		if (splitters.hasOwnProperty(project.slug)) {
			const splitted = splitters[project.slug](xmlData.xmlio) as Element[]
			entries = { ...project.entries, [filename]: splitted.map(s => new XMLio(s)) }
		}

		const partialState = this.updateProject(project, { xml, entries })
		return { ...partialState, xmlio: xmlData.xmlio }
	}

	state: State = {
		project: null,
		projects: [],
		setProjects: async () => {
			const nextState = await this.ensureProjects()
			this.setState(() => nextState)
		},
		setProject: async (slug: string) => {
			const nextState = await this.ensureProject(slug) as State
			this.setState(() => nextState)

		},
		setXml: async (slug: string, filename: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			this.setState(() => nextState)
		},
		setEntry: async (slug: string, filename: string, entryId: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			if (entryId != null) {
				const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project
				nextState.xmlio = project.entries[filename][parseInt(entryId, 10)]
			}
			this.setState(() => nextState)
		},
		xmlio: null
	}

	private updateProject(prevProject: ProjectModel, props: Partial<ProjectModel>): Pick<State, 'project' | 'projects'> {
		const project = { ...prevProject, ...props }	
		const projects = this.state.projects
			.filter(p => p.id !== project.id)
			.concat(project)
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
						<Link to={`/projects/${this.state.project.slug}`}>{this.state.project.title}</Link>
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
						exact
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