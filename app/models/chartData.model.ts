
export interface ChartData {
	id: string,
	chart: {
		type: string,
		renderTo?: string
	},
	title: {
		text: string
	},
	xAxis: {
		categories: Array<string>
	},
	yAxis: {
		title: {
			text: string
		}
	},
	series: Array<Serie>
}

export interface Serie {
	name: string,
	data: Array<number>
}