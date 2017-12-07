import { ChartData, chartDataModel } from './models/chartData.model';

export function parseChartData(rdata) {
	let chartData: chartDataModel = new ChartData();

	let chartOpts= {
		marginRight: 220,
		legend: {
			align: 'right', 
			verticalAlign: 'middle', 
			layout: 'vertical', 
			floating: false
		}
	}

	let seriesOpts = {
		valShr: { color: '#06c', data: [], name: 'Val Shr' },	
		trend: { color: '#036', data: [], name: 'Trend' },
		localOutliner: { color: '#ffa500', data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: 'Local Outliner' },
		globalOutliner: { color: '#f00', data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: 'Global Outliner' },
		range: { color: '#9DC3E3', data: [], name: 'Range' }
	}

	let breakOpts = {
		//borderWidth: 10,
		color: null,
		label: {
			text: 'BREAK', 
			rotation: 90, 
			align: 'center', 
			verticalAlign: 'top', 
			textAlign: 'left', 
			x: -5
		},
		from: null,
		to: null
	}

	let rangeOpts = {
		type: 'arearange',
		fillOpacity: 0.3,
		zIndex: -1
	}

	let periodsOpts = {
		text: '',
		rotation: 90,
		textAlign: 'left',
		color: '#cce6ff',
		from: null,
		to: null
	}

	var trend: number = null;
	var breaks: Array<any> = [];

	chartData.marginRight = chartOpts.marginRight;
	chartData.legend = chartOpts.legend;

	chartData.series.push(seriesOpts.valShr, seriesOpts.trend, seriesOpts.localOutliner, seriesOpts.globalOutliner, seriesOpts.range);

	rdata.forEach((item, idx, rdata) => {
		let oldTrend = trend;	
		let len = rdata.length;	
		trend = countTrend(rdata, oldTrend, idx, item.SLOPE, item.INTERCEPT);		

		chartData.title.text = [item.MARKET,item.BRAND,item.MEASURE].join(' ');
		chartData.xAxis.categories = [];
		chartData.xAxis.categories.push(item.DATE);
		
		chartData.series[0].data.push(item.TARGET_VAR);
		chartData.series[1].data.push(trend);
		chartData.series[2].data.push(countLocalOutlier(item.LOCAL_OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[3].data.push(countLocalOutlier(item.OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[4].data.push(countRange(trend, item.LOCAL_STANDARD_ERROR));
		
		breaks.push(addPlotBreaks(breakOpts, idx, item.BREAKPOINT_INDICATOR, item.BREAKPOINT_SHIFT_ABS));
	});
	console.log(breaks.filter((e) => { return e; }));
	chartData.xAxis.plotBands = breaks.filter((e) => { return e; });
	return chartData;
}

function countTrend(
		data: any, 
		trend: number, 
		idx: number, 
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

function addPlotBreaks(breakOpts: any, idx: number, brk_ind: number, brk_shift_abs: number) {	
		let copy = JSON.parse(JSON.stringify(breakOpts));
		if(brk_ind === 1) {		
			copy.from = idx-1;
			copy.to = idx;
			brk_shift_abs > 0 ? copy.color = '#066F07' : copy.color = '#FF3366';
			return copy;
		}
		return null;
}

function addPeriodToAnal(opts: any, idx: number, early_wrn_ind: number, before: boolean) {
	if(early_wrn_ind !== 0) {		
		if(before) {
			console.log(true);
			opts.text = '3 Months before';
			opts.from = idx - 3;
			opts.to = idx - 1;
		}
		else {
			console.log(false);
			opts.text = '3 Months after';
			opts.from = idx;
			opts.to = idx + 2;
		}
		return opts;		
	}	
	else { return null };
}

function addSlopeAddnotation() {
	// szukam "BREAKPOINT_INDICATOR": 1
	// liczę do góry
	// w połowie wstawia label -> API
}

		// breaks[idx+1] = Object.assign(periodsOpts, { text: '3 Months before', from: idx-3, to: idx-1 });
			// breaks[idx+2] = Object.assign(periodsOpts, { text: '3 Months after', from: idx, to: idx+2 });