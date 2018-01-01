// === Chart Data related models
// @desc Models for Highchart data object.


export class ChartData {
	constructor(
			public chart = {},
			public title = {},
			public xAxis = { plotBands: [], categories: [] },
			public yAxis = {},
			public series = [],
			public annotations = []
	) {}
}


export interface chartDataModel {
	marginRight?: number,
	legend?: any
	annotations?: Array<any>
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