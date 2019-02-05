import * as React from 'react'
import { Route } from 'react-router'
import ProjectAdmin from './project'
import { State as AppState } from '../index'

export default function(appState: AppState) {
	return (
		<Route
			path="/admin/project/:slug"
			render={(props) =>
				<ProjectAdmin {...appState} {...props} />
			}
		/>
	)
}