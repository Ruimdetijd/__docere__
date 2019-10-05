import App from './app'
import { fetchEntryXml } from './utils'

export default class BrowserApp extends App {
	componentDidMount() {
		window.addEventListener('popstate', () => {
			const [, ,entryId, pageId] = document.location.pathname.split('/')
			if (entryId == null && this.state.entryId != null) this.setEntryId(null, false)
			else if (entryId === 'pages' && pageId != null) this.setPage(this.props.configData.config.pages.find(p => p.id === pageId), false)
			else if (entryId != null) this.setEntryId(entryId, false)
		})
	}

	protected async getEntryDoc() {
		return await fetchEntryXml(this.props.configData.config.slug, this.props.entryId)
	}

	protected afterSetEntryId(entryId: string, push: boolean) {
		let url = `/${this.props.configData.config.slug}`
		let title = this.props.configData.config.title
		if (entryId != null) {
			url += `/${entryId}`
			title = `${title} - ${entryId}`
		}
		if (push) history.pushState({}, title, url)
		document.title = title
	}

	protected afterSetPage(page: PageConfig, push: boolean) {
		if (push) history.pushState({}, page.title, `/${this.props.configData.config.slug}/pages/${page.id}`)
	}
}
