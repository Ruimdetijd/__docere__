import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router'
import { MatchParams, State } from './index'
import menuData from './menu-data';
import { Project } from '../../models';
import { State as AppState } from '../../index'

export interface Props extends AppState, RouteComponentProps<MatchParams> {
	change: (key: keyof State, value: any) => void
	project: Project
}
export default function Menu(props: Props) {
	return (
		<div>
			{
				menuData.map(item => 
					<Route
						exact
						key={item.slug}
						path={`${props.match.url}/${item.slug}`}
						render={(routerProps) => <item.component {...routerProps} {...props} />}
					/>
				)
			}
		</div>
	)
}
