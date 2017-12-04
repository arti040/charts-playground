export class ChartData {
	constructor(
			public chart = {},
			public title = {},
			public xAxis = {},
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
		categories?: Array<string>
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