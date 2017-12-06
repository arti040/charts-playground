import { ChartData, chartDataModel } from './models/chartData.model';

export function parseChartData(rdata) {
	let chartData: chartDataModel = new ChartData();

	let opts = {
		valShr: { color: '#06c', data: [], name: 'Val Shr' },	
		trend: { color: '#036', data: [], name: 'Trend' },
		localOutliner: { color: '#ffa500', data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: 'Local Outliner' },
		globalOutliner: { color: '#f00', data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: 'Global Outliner' },
		range: { color: '#9DC3E3', data: [], name: 'Range' }
	}

	let breaksOpts = {
		text: 'BREAK', 
		rotation: 90, 
		align: 'center', 
		verticalAlign: 'top', 
		textAlign: 'left', 
		x: -5,
		borderWidth: 10,
		borderColor: null
	}

	var trend: number = null;
	
	chartData.marginRight = 220;
	chartData.legend = { align: 'right', verticalAlign: 'middle', layout: 'vertical', floating: false }
	chartData.series.push(opts.valShr, opts.trend, opts.localOutliner, opts.globalOutliner, opts.range);

	rdata.forEach((item, idx, rdata) => {
		let oldTrend = trend;		
		trend = countTrend(rdata, oldTrend, idx, item.TARGET_VAR, item.INTERCEPT, item.SLOPE, item.INTERCEPT);		

		chartData.title.text = [item.MARKET,item.BRAND,item.MEASURE].join(' ');
		chartData.xAxis.categories = [];
		chartData.xAxis.categories.push(item.DATE);
		
		chartData.series[0].data.push(item.TARGET_VAR);
		chartData.series[1].data.push(trend);
		chartData.series[2].data.push(countLocalOutlier(item.LOCAL_OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[3].data.push(countLocalOutlier(item.OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[4].data.push(countRange(trend, item.LOCAL_STANDARD_ERROR));
		chartData.series[4].type = 'arearange';
		chartData.series[4].fillOpacity = 0.3;
		chartData.series[4].zIndex= -1;
		
		chartData.xAxis.breaks.push(addPlotBreaks(breaksOpts, item.BREAKPOINT_INDICATOR, item.BREAKPOINT_SHIFT_ABS, item.OUTLIER_INDICATOR));
	
	});
	return chartData;
}

function countTrend(
		data: any, 
		trend: number, 
		idx: number, 
		val: number, 
		brk_ind: number, 
		slope: number, 
		intercept: number
	) {	
			if(idx === 0) {
				return intercept ? 
					intercept + slope : 
						data[idx+1].INTERCEPT + slope + data[idx+1].SLOPE;
			}
			else {
				return data[idx-1].BREAKPOINT_INDICATOR == 1 ?
								intercept + slope :
									!slope ? trend + data[idx-1].slope : trend + slope
			}
}

function countRange(trend: number, loc_st_err: number) {
	if(!loc_st_err) { return [null, null]; }
	let low = trend - 1.5 * loc_st_err;
	let high = trend + 1.5 * loc_st_err;
	return { low: low, high: high };
}

function countLocalOutlier(loc_out_ind: number, val: number) {
	return !loc_out_ind || loc_out_ind == 0 ? null : val;
}

function countOutlierIndicator(out_ind, val) {
	return !out_ind || out_ind == 0 ? null : val;
}

function addPlotBreaks(
		opts: any,
		brk_ind: number, 
		brk_shift_abs: number,
		out_ind: number
	) {
		if(brk_ind === 1) {
			brk_shift_abs > 0 ? opts.borderColor = '#066F07' : opts.borderColor = '#FF3366';
			return opts;
		}
		return null;		
}

function addPeriodToAnal(idx: number, brk_ind: number, wrn_ind: number, before: boolean) {
	// if(brk_ind || wrn_ind != 0) {
	// 	if(before) {
	// 		let opts = {
	// 			text: '3 Months before',
	// 			rotation: 90,
	// 			textAlign: 'left',
	// 			color: '#cce6ff',
	// 			from: idx - 3,
	// 			to: idx - 1
	// 		}
	// 	}
	// 	else {
	// 		let opts = {
	// 			text: '3 Months after',
	// 			rotation: 90,
	// 			textAlign: 'left',
	// 			color: '#cce6ff',
	// 			from: idx,
	// 			to: idx + 2
	// 		}
	// 	}
		
	// }
	// return opts;
}

function addSlopeAddnotation() {
	// szukam "BREAKPOINT_INDICATOR": 1
	// liczę do góry
	// w połowie wstawia label -> API
}