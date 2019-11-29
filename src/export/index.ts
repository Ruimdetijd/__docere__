/// <reference path="../types/index.d.ts"/>

import Entry from '../entry'
import wrapAsFileExplorer from '../entry-selector/wrap-as-file-explorer'
import * as constants from '../constants'
import extendConfigData from './extend-config-data'
import App from '../app'
import getPb from '../project-components/pb'
import * as rs from '../project-components/rs'
import { hi, lb } from '../project-components'

const components = {
	getPb,
	hi,
	lb,
	...rs
}

export {
	App,
	components,
	constants,
	extendConfigData,
	Entry,
	wrapAsFileExplorer,
}
