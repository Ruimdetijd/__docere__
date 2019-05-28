import * as React from 'react'
import styled from '@emotion/styled'
import { FacsThumbProps } from 'dispilio'
import 'docere-config'
import { Rs } from './index'
import { TabName } from '../entry/index'

const NoWrap = styled.span`
	white-space: nowrap;
`

const Img = styled.img`
	cursor: pointer;
	position: absolute;
	left: 0;
	margin-top: 6px;
	width: 32px;
`

function pb(props: FacsThumbProps & { facs: string }) {
	return (
		<span
			onClick={() => {
				console.log(props)
				// // Use the attr provided by extractedFacsimileData to retrieve the ID of the current element
				// const id = props[props.extractedFacsimileData.attr]
				// // With the ID find the associated path
				// const facsimile = props.extractedFacsimileData.facsimiles.find(facs => facs.id === id)
				// props.setState({ facsimiles: [props.facs] })
			}}
		>
			<Img src={`https://images.huygens.knaw.nl/iiif/${props.facs.slice(0, -4)}.tif/full/,32/0/native.jpg`} />
		</span>
	)
}

const components: DispilioComponents = {
	pb,
}

// Map all the text data configs to components. Person and Loc are overwritten later
config.textdata.forEach(td => {
	components[td.extractor.selector] = function(props) {
		return (
			<Rs
				{...props}
				active={props.activeListId === td.id && props.activeId === props.children[0]}
				color={td.color}
				onClick={() => props.activeTab === TabName.TextData ? props.setActiveId(td.id, props.children[0]) : null}
			/>
		)
	}
})


function rsWithIcon(rsConfig: TextData, SvgComponent: React.StatelessComponent<SvgProps>) {
	return function (props) {
		// The RS is active when the text data list (defined by the ID), for example: person, place, theme, etc
		// and the ID match. Only the ID is not sufficient, because two lists could have matching IDs.
		const active = props.activeListId === rsConfig.id && props.activeId === props.children[0]

		// To prevent a wrap between the icon and the first word the first word is extracted.
		// The icon and the first word are placed inside a span with white-space: nowrap.
		let firstWord
		let restOfFirstChild
		if (props.children.length && typeof props.children[0] === 'string') {
			const [fw, ...rofc] = props.children[0].split(/\s/us)
			firstWord = fw
			restOfFirstChild = ' '.concat(rofc.join(' '))
		}

		return (
			<Rs
				{...props}
				active={active}
				color={rsConfig.color}
				onClick={() => props.activeTab === TabName.TextData ? props.setActiveId(rsConfig.id, props.children[0]) : null}
			>
				<NoWrap>
					{
						props.activeTab === TabName.TextData &&
						<SvgComponent
							active={active}
							color={rsConfig.color}
						/>
					}
					{firstWord}
				</NoWrap>
				{restOfFirstChild}
				{props.children.slice(1)}
			</Rs>
		)

	}
}

// Person
interface SvgProps { active: boolean, color: string }
function PersonSvg(props: SvgProps) {
	return (
		<svg viewBox="0 0 64 64" style={{width: 20, height: 20, verticalAlign: 'text-top'}}>
			<path
				fill={props.active ? 'white' : props.color}
				d="M31.941,36.688c-7.102,0-12.856-6.898-12.856-15.401c0-8.502,5.754-14.804,12.856-14.804c7.103,0,12.862,6.302,12.862,14.804C44.803,29.79,39.044,36.688,31.941,36.688z M11.943,57.508c0,0-2.727,0.18-3.928-1.475c-0.649-0.894-0.197-2.706,0.247-3.717l1.087-2.477c0,0,3.006-6.723,6.428-10.619c2.102-2.389,4.602-1.845,6.219-1.068c0.996,0.478,2.122,1.871,2.945,2.609c1.134,1.017,3.136,2.173,6.409,2.238h2.008c3.271-0.065,5.273-1.221,6.406-2.238c0.822-0.738,1.917-2.174,2.904-2.668c1.484-0.743,3.743-1.2,5.79,1.127c3.423,3.896,6.134,10.741,6.134,10.741l1.114,2.429c0.461,1.004,0.933,2.807,0.302,3.713c-1.126,1.62-3.654,1.405-3.654,1.405H11.943z"
			/>
		</svg>
	)
}
const personConfig = config.textdata.find(td => td.id === 'person')
components['ner[type="per"]'] = rsWithIcon(personConfig, PersonSvg)


// Place
function PlaceSvg(props: SvgProps) {
	return (
		<svg viewBox="0 0 512 512" style={{width: 20, height: 20, verticalAlign: 'text-top'}}>
			<path
				fill={props.active ? 'white' : props.color}
				d="M256,22.709c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834c31.846,57.063,63.168,104.643,64.484,106.64L256,489.291l22.941-34.774c1.318-1.998,32.641-49.578,64.484-106.64c45.023-80.68,66.908-136.559,66.908-170.834C410.334,91.943,341.1,22.709,256,22.709z M256,256c-44.182,0-80-35.817-80-80s35.818-80,80-80s80,35.817,80,80S300.182,256,256,256z"/>
		</svg>
	)
}
const placeConfig = config.textdata.find(td => td.id === 'loc')
components['ner[type="loc"]'] = rsWithIcon(placeConfig, PlaceSvg)

export default components
