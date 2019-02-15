import Settings from './components/settings'
import Splitter from './components/splitter'
import ExtractMetadata from './components/metadata-extractor'
import ExtractFacsimiles from './facsimile-extractor-form'
import ListXMLDocuments from './components/list-xml-documents'
import Extractors from './components/extractors'
import Metadata from './components/metadata'

const menuData = [
	{
		component: Settings,
		slug: 'settings',
		title: 'Settings'
	},
	{
		component: Splitter,
		slug: 'splitter',
		title: 'Split XML'
	},
	{
		component: ExtractFacsimiles,
		slug: 'facsimile-extractor',
		title: 'Extract facsimiles'
	},
	{
		component: Extractors,
		slug: 'extractors',
		title: 'Extract data from text'
	},
	{
		component: ExtractMetadata,
		slug: 'metadata-extractor',
		title: 'Extract metadata'
	},
	{
		component: Metadata,
		slug: 'metadata',
		title: 'Metadata'
	},
	{
		component: ListXMLDocuments,
		slug: 'list-xml-documents',
		title: 'List XML documents'
	},
]

export default menuData