export class ChartData {
	constructor(
			public chart = {},
			public title = {},
			public xAxis = { plotBands: [] },
			public yAxis = {},
			public series = []
	) {}
}


export interface chartDataModel {
	marginRight?: number,
	legend?: any
	chart: {
		type?: string,
		renderTo?: string
	},
	title: {
		text?: string
	},
	xAxis: {
		title?: string,
		categories?: Array<string>,
		plotBands?: Array<any>
	},
	yAxis: {
		title?: {
			text?: string
		}
	},
	series?: Array<Serie>
}

export interface Serie {
	name?: string,
	color?: string,
	zIndex?: number,
	type?: string,
	fillOpacity?: number,
	data?: Array<any>
}