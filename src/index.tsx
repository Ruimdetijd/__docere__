import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import 'docere-config'
import Header from './header'
import Entry from './entry'
import Search from './project'
import { TOP_OFFSET } from './constants'

export const Main = styled('div')`
	background-color: white;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: ${TOP_OFFSET}px auto;
	width: 100%;
`

// TODO keep search state when navigating to/from entry
// TODO when clicking facsimile in search results, activate and scroll to that facsimile in entry view
// TODO add middle page in search result pagination ie: 1 2 3 ... 10 ... 18 19 20 (add the 10)

class App extends React.Component<{}, AppState> {
	state: AppState = {
		getPrevNext: null,
		searchQuery: null,
		setAppState: (key, value) => {
			this.setState({ [key]: value } as any)
		},
	}

	render() {
		return (
			<BrowserRouter>
				<Main>
					<Header />
						<Route path="/:slug" exact render={props =>
							<Search
								{...props}
								{...this.state}
							/>
						} />
						<Route
							exact
							path="/:projectSlug/:xmlId"
							render={this.renderEntry}
						/>
				</Main>
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

document.addEventListener('DOMContentLoaded', function() {
	const container = document.getElementById('container')
	ReactDOM.render(<App />, container)
})

	// private nextProjectState = (
	// 	props: Partial<ProjectModel>,
	// 	project?: ProjectModel,
	// 	projects?: ProjectModel[]
	// ): Pick<State, 'project' | 'projects'> => {
	// 	// Extend the project with next props
	// 	if (project == null) project = this.state.project
	// 	project = { ...project, ...props }	

	// 	// Replace the old project in state.projects
	// 	if (projects == null) projects = this.state.projects
	// 	projects = projects
	// 		.filter(p => p.id !== project.id)
	// 		.concat(project)

	// 	return { project, projects }
	// }


	// private async ensureProjects(): Promise<Pick<State, 'projects'>> {
	// 	const nextState = {} as Pick<State, 'projects'>

	// 	if (!this.state.projects.length) {
	// 		const response = await fetch(`/api/projects`)
	// 		const projects = await response.json()
	// 		nextState.projects = projects
	// 	}

	// 	return nextState
	// }

	// private async fetchProject(slug: string): Promise<ProjectModel> {
	// 	const response = await fetch(`/api/projects/${slug}`)
	// 	let nextProject: ProjectModel = await response.json()
	// 	nextProject = parseReceivedProject(nextProject)

	// 	// TODO entries and xml should be copied from current project
	// 	return {
	// 		...nextProject,
	// 		entries: {},
	// 		xml: {}
	// 	}
	// }

	// private async ensureProject(slug: string): Promise<Partial<State>> {
	// 	if (this.state.project != null && this.state.project.slug === slug) return {}

	// 	if (!this.state.projects.length) {
	// 		const nextState: Partial<State> = {}

	// 		// If projects was not downloaded yet, the project to ensure must be new as well
	// 		nextState.project = await this.fetchProject(slug)

	// 		const { projects } = await this.ensureProjects()

	// 		// Assign projects to nextState and replace the project
	// 		// in projects with the full, fetched project
	// 		nextState.projects = projects
	// 			.filter(p => p.id !== nextState.project.id)
	// 			.concat(nextState.project)

	// 		return nextState
	// 	}

	// 	// const projects = nextState.hasOwnProperty('projects') ? nextState.projects : this.state.projects
	// 	const project = this.state.projects.find(p => p.slug === slug)

	// 	if (project.xml == null) {
	// 		const nextProject = await this.fetchProject(slug)
	// 		return this.nextProjectState(nextProject)	
	// 	}

	// 	return {}
	// }

	// private async ensureXml(slug: string, filename: string): Promise<Partial<State>> {
	// 	const nextState = await this.ensureProject(slug)
	// 	const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project

	// 	if (project.xml.hasOwnProperty(filename)) {
	// 		const { xmlio } = project.xml[filename]
	// 		return (xmlio !== this.state.xmlio) ? { xmlio } : {}
	// 	}

	// 	const xmlData = await fetchXml(project.slug, filename)	
	// 	const xml = { ...project.xml, [filename]: xmlData }	

	// 	// TODO fix this. new XMLio expects an XML Document
	// 	// let entries = {}
	// 	// if (splitters.hasOwnProperty(project.slug)) {
	// 	// 	const splitted = splitters[project.slug](xmlData.xmlio) as Element[]
	// 	// 	entries = { ...project.entries, [filename]: splitted.map(s => new XMLio(s)) }
	// 	// }

	// 	const partialState = this.nextProjectState({ xml }, project, nextState.projects)
	// 	return { ...partialState, xmlio: xmlData.xmlio }
	// }
