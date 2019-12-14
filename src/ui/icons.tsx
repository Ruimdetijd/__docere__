import * as React from 'react'
import { AsideTab, FooterTab, SearchTab } from '../constants'

interface IconProps {
	active: boolean
}

function SearchLeftIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 250.313 250.313">
			<g
				style={{ fill: props.active ? 'white' : 'gray' }}
			>
				<polygon points="30,105 140,40 140,165" fill="#555" />
				<path d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z"></path>
			</g>
		</svg>
	)
}

function SearchRightIcon(props: IconProps) {
	return (
		<svg viewBox="0 0 250.313 250.313">
			<g
				style={{ fill: props.active ? 'white' : 'gray' }}
			>
				<polygon points="165,105 70,40 70,165" fill="#555" />
				<path d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z"></path>
			</g>
		</svg>
	)
}

function LayersIcon(props: IconProps) {
	return (
		<svg
			viewBox="0 0 982.000000 830.000000"
		>
			<g
				transform="translate(0.000000,830.000000) scale(0.100000,-0.100000)"
				style={{ fill: props.active ? 'white' : 'gray' }}
			>
				<path d="M4069 8287 c-108 -30 -211 -123 -250 -225 -19 -49 -23 -87 -29 -267
				-9 -243 -23 -380 -52 -520 -84 -409 -262 -640 -629 -814 -87 -42 -1123 -480
				-2534 -1073 -354 -149 -391 -167 -439 -208 -73 -64 -126 -183 -126 -281 0
				-110 65 -236 158 -303 58 -43 -200 38 2657 -841 l2390 -736 90 3 90 4 350 164
				c1018 475 1643 759 2185 992 140 60 327 147 416 192 514 264 815 581 954 1006
				92 279 124 588 118 1130 l-3 305 -29 62 c-33 73 -113 154 -181 184 -25 11
				-848 218 -1828 460 -980 241 -2086 514 -2457 606 -698 173 -762 185 -851 160z
				m1057 -988 c313 -77 1235 -304 2049 -505 814 -201 1484 -369 1489 -374 11 -11
				-10 -462 -28 -580 -39 -251 -118 -416 -268 -555 -148 -139 -285 -214 -779
				-429 -563 -244 -1259 -560 -2073 -940 -136 -64 -254 -116 -261 -116 -14 0
				-3747 1148 -3753 1155 -3 2 6 9 19 14 175 68 1844 778 1929 820 372 186 639
				428 816 738 121 213 213 514 246 806 10 88 15 107 29 107 9 0 272 -63 585
				-141z"/>
				<path d="M9368 4140 c-27 -5 -737 -322 -1735 -775 -928 -422 -1842 -837 -2030
				-923 l-342 -155 -2398 739 c-2389 736 -2398 739 -2484 739 -76 0 -93 -4 -151
				-33 -79 -38 -149 -110 -186 -190 -23 -48 -27 -71 -27 -148 0 -84 2 -95 38
				-166 39 -79 89 -133 158 -168 19 -10 1155 -363 2523 -784 2273 -700 2494 -766
				2557 -766 43 0 87 7 119 19 27 10 989 446 2137 967 2331 1060 2157 973 2225
				1112 30 61 33 74 33 162 0 86 -3 101 -33 161 -53 110 -154 185 -277 208 -64
				12 -60 12 -127 1z"/>
				<path d="M9347 2630 c-20 -6 -948 -424 -2062 -930 l-2024 -920 -2388 736
				c-2543 784 -2467 762 -2583 734 -164 -39 -289 -212 -278 -386 8 -129 88 -253
				199 -310 72 -36 4984 -1545 5051 -1551 31 -3 78 0 105 6 26 7 995 443 2152
				969 1467 666 2118 967 2151 993 56 44 103 115 124 188 67 231 -101 464 -344
				477 -36 2 -82 -1 -103 -6z"/>
			</g>
		</svg>
	)
}

function LabelIcon(props: IconProps) {
	return (
		<svg
			viewBox="0 0 980.000000 980.000000"
		>
			<g
				transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)"
				style={{ fill: props.active ? 'white' : 'gray' }}
			>
				<path d="M5005 9782 c-28 -9 -70 -29 -95 -44 -46 -26 -4803 -4781 -4849 -4846
				-31 -45 -61 -142 -61 -201 0 -63 25 -145 61 -201 35 -56 4390 -4409 4440
				-4438 100 -60 237 -64 350 -11 60 28 230 196 2471 2437 2326 2325 2408 2409
				2440 2477 l33 70 0 2245 0 2245 -31 65 c-40 83 -102 145 -184 184 l-65 31
				-2230 2 c-2096 2 -2233 1 -2280 -15z m4043 -2622 l2 -1885 -2179 -2179 -2180
				-2180 -788 782 c-433 429 -1284 1277 -1891 1884 l-1102 1103 2182 2183 2183
				2182 1885 -3 1885 -2 3 -1885z"/>
				<path d="M7315 8550 c-252 -26 -499 -144 -681 -325 -377 -376 -440 -964 -151
				-1408 221 -340 594 -532 996 -514 288 13 538 123 742 326 221 221 333 489 332
				796 0 190 -34 339 -115 500 -89 177 -236 342 -399 449 -213 138 -473 201 -724
				176z m260 -465 c243 -52 453 -256 509 -495 20 -84 20 -249 1 -325 -47 -185
				-190 -363 -357 -444 -377 -183 -812 3 -945 404 -23 69 -27 97 -27 205 0 114 3
				133 30 211 38 107 106 211 187 284 73 67 213 139 307 159 86 19 209 19 295 1z"/>
			</g>
		</svg>
	)
}

function NotesIcon(props: IconProps) {
	return (
		<svg
			viewBox="0 0 345.369 345.369"
		>
			<g style={{ fill: props.active ? 'white' : 'gray' }}>
				<path d="M199.654,105.629H49.965c-4.143,0-7.5-3.357-7.5-7.5s3.357-7.5,7.5-7.5h149.689c4.142,0,7.5,3.357,7.5,7.5
					S203.796,105.629,199.654,105.629z"/>
				<path d="M163.922,139.246H49.965c-4.143,0-7.5-3.357-7.5-7.5c0-4.143,3.357-7.5,7.5-7.5h113.957c4.142,0,7.5,3.357,7.5,7.5
					C171.422,135.889,168.063,139.246,163.922,139.246z"/>
				<path d="M87.682,240.096H49.965c-4.143,0-7.5-3.357-7.5-7.5c0-4.143,3.357-7.5,7.5-7.5h37.717c4.142,0,7.5,3.357,7.5,7.5
					C95.182,236.738,91.823,240.096,87.682,240.096z"/>
				<path d="M71.332,273.713H49.965c-4.143,0-7.5-3.357-7.5-7.5c0-4.143,3.357-7.5,7.5-7.5h21.367c4.142,0,7.5,3.357,7.5,7.5
					C78.832,270.355,75.474,273.713,71.332,273.713z"/>
				<path d="M333.404,34.782l-17.108-12.757c-4.308-3.212-9.605-4.558-14.923-3.779c-5.316,0.775-10.012,3.573-13.223,7.88
					c-0.002,0.002-0.004,0.005-0.005,0.007l-42.411,57.48V26.529c0-4.143-3.357-7.5-7.5-7.5h-31.08V7.5c0-4.143-3.358-7.5-7.5-7.5
					c-4.143,0-7.5,3.357-7.5,7.5v11.529H169.73V7.5c0-4.143-3.357-7.5-7.5-7.5c-4.142,0-7.5,3.357-7.5,7.5v11.529h-22.422V7.5
					c0-4.143-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.357-7.5,7.5v11.529H94.887V7.5c0-4.143-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.357-7.5,7.5
					v11.529H57.465V7.5c0-4.143-3.358-7.5-7.5-7.5c-4.143,0-7.5,3.357-7.5,7.5v11.529H11.383c-4.142,0-7.5,3.357-7.5,7.5v311.34
					c0,4.143,3.358,7.5,7.5,7.5h226.852c4.143,0,7.5-3.357,7.5-7.5V188.138l91.767-125.204c0.001-0.002,0.003-0.003,0.005-0.005
					C344.134,54.038,342.295,41.412,333.404,34.782z M230.734,330.369H18.883V34.029h23.582v11.527c0,4.143,3.357,7.5,7.5,7.5
					c4.142,0,7.5-3.357,7.5-7.5V34.029h22.422v11.527c0,4.143,3.357,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5V34.029h22.422v11.527
					c0,4.143,3.357,7.5,7.5,7.5c4.143,0,7.5-3.357,7.5-7.5V34.029h22.422v11.527c0,4.143,3.358,7.5,7.5,7.5
					c4.143,0,7.5-3.357,7.5-7.5V34.029h22.424v11.527c0,4.143,3.357,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5V34.029h23.58v70.166
					l-39.113,53.668H49.965c-4.143,0-7.5,3.357-7.5,7.5c0,4.143,3.357,7.5,7.5,7.5h130.725c0,0-42.642,58.513-42.65,58.525
					c0,0,0.002,0,0.004,0c-0.484,0.673-0.87,1.432-1.115,2.272l-17.15,58.669H49.965c-4.143,0-7.5,3.357-7.5,7.5
					c0,4.143,3.357,7.5,7.5,7.5c0,0,75.515-0.006,75.555-0.006c0-0.001-0.001-0.002-0.002-0.002c1.373-0.022,2.744-0.413,3.951-1.193
					l56.059-36.229c0.771-0.498,1.412-1.119,1.932-1.813c0.018-0.024,43.275-59.367,43.275-59.367V330.369z M148.296,248.23
					l20.024,14.932l-30.069,19.432L148.296,248.23z M179.861,253.057l-25.305-18.869L272.844,71.883l25.305,18.869L179.861,253.057z
					M307.05,78.678l-25.306-18.869l8.076-10.83l25.305,18.871L307.05,78.678z M325.48,53.962c-0.002,0.002-0.004,0.005-0.005,0.007
					l-1.384,1.855l-25.305-18.871l1.383-1.854c0.002-0.002,0.004-0.004,0.006-0.006c0.816-1.095,2.01-1.807,3.361-2.004
					c1.353-0.196,2.697,0.146,3.791,0.961l17.109,12.757C326.697,48.492,327.165,51.702,325.48,53.962z"/>
			</g>
		</svg>
	)
}

export default {
	[AsideTab.Metadata]: React.memo(LabelIcon),
	[AsideTab.Notes]: React.memo(NotesIcon),
	[AsideTab.TextData]: null,

	[FooterTab.PanelSelector]: React.memo(LayersIcon),

	[SearchTab.Results]: React.memo(SearchRightIcon),
	[SearchTab.Search]: React.memo(SearchLeftIcon),
}
