import * as React from 'react'
import { Link } from 'react-router-dom'
import menuData from './menu-data'

interface Props {
	slug: string
}
export default function Menu(props: Props) {
	return (
		<aside>
			<ul style={{ display: 'grid', height: '100%', gridTemplateRows: 'repeat(auto-fill, 72px)'}}>
				{
					menuData.map(item => 
						<li key={item.slug} style={{ display: 'grid', borderBottom: '1px solid lightblue', alignContent: 'center', cursor: 'pointer'}}>
							<Link
								style={{ textDecoration: 'none', color: '#888', textTransform: 'uppercase' }}
								to={`/admin/projects/${props.slug}/${item.slug}`}
							>
								{item.title}
							</Link>
						</li>		
					)
				}
			</ul>
		</aside>
	)
}