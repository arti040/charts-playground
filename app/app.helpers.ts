import { ChartData, chartDataModel } from './models/chartData.model';

export function parseChartData(rdata) {
	let chartData: chartDataModel = new ChartData();

	let chartOpts = {
		chart: { 		
			width: 900,
			marginRight: 220			
		},
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

	let periodOpts = {
		label: {
			text: null,
			rotation: 90,
			textAlign: 'left',
			color: '#cce6ff',
			x: -5
		},
		from: null,
		to: null
	}

	var trend: number = null;
	var breaks: Array<any> = [];
	var annotations: Array<any> = [];
	var slopes: Array<any> = [];
	
	chartData.xAxis.categories = [];

	chartData = Object.assign({}, chartData, chartOpts);
	chartData.series.push(seriesOpts.valShr, seriesOpts.trend, seriesOpts.localOutliner, seriesOpts.globalOutliner, seriesOpts.range);
	chartData.series[4] = Object.assign({}, chartData.series[4], rangeOpts);


	rdata.forEach((item, idx, rdata) => {
		let oldTrend = trend;	
		let len = rdata.length;	
		trend = countTrend(rdata, oldTrend, idx, item.SLOPE, item.INTERCEPT);		

		chartData.title.text = [item.MARKET,item.BRAND,item.MEASURE].join(' ');
		chartData.xAxis.categories.push(item.DATE);
		
		chartData.series[0].data.push(item.TARGET_VAR);
		chartData.series[1].data.push(trend);
		chartData.series[2].data.push(countLocalOutlier(item.LOCAL_OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[3].data.push(countLocalOutlier(item.OUTLIER_INDICATOR, item.TARGET_VAR));
		chartData.series[4].data.push(countRange(trend, item.LOCAL_STANDARD_ERROR));
		
		breaks.push(addPlotBreaks(breakOpts, idx, item.BREAKPOINT_INDICATOR, item.BREAKPOINT_SHIFT_ABS));
		breaks = breaks.concat(addPeriods(periodOpts, idx, item.BREAKPOINT_INDICATOR, item.EARLY_WARNING_INDICATOR));

		slopes.push(getSlopes(idx, item.SLOPE));	
	});


	// Remove empty elements from Array
	chartData.xAxis.plotBands = breaks.filter((e) => { return e; });
	chartData.annotations.push(addSlopeAnnotations(groupSlopes(slopes)));

	console.log(chartData);
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

function countLocalOutlier(loc_out_ind: number, target_var: number) {
	return !loc_out_ind || loc_out_ind == 0 ? null : target_var;
}

function countOutlierIndicator(out_ind, target_var) {
	return !out_ind || out_ind == 0 ? null : target_var;
}

function addPlotBreaks(opts: any, idx: number, brk_ind: number, brk_shift_abs: number) {	
		let copy = JSON.parse(JSON.stringify(opts));
		if(brk_ind === 1) {		
			copy.from = idx-1;
			copy.to = idx;
			brk_shift_abs > 0 ? copy.color = '#066F07' : copy.color = '#FF3366';
			return copy;
		}
		return null;
}

function addPeriods(opts: any, idx: number, brk_ind: number, early_warn_ind: number) {
	let before, after, periods = [];
	before = JSON.parse(JSON.stringify(opts));
	after = JSON.parse(JSON.stringify(opts));
	before.label.text = '3 Months before';
	after.label.text = '3 Months after';
	before.color = '#cce6ff';
	after.color = '#cce6ff';
	
	if(brk_ind !== 0) {		
		before.from = idx - 3;
		before.to = idx - 1;
		after.from = idx;
		after.to = idx + 2;

		periods.push(before, after);		
	}	

	if(early_warn_ind !== 0) {		
		before.from = idx - 3;
		before.to = idx - 1;
		after.from = idx;
		after.to = idx + 2;

		periods.push(before, after);	
	}

	return periods.length ? periods : null;
}

function getSlopes(idx: number, slope: number) {
	return { idx, slope: slope || null };
}

function groupSlopes(slopes: Array<any>) {
	let groups: Array<any> = [];
	let i: number = 0;

	while(slopes.length) {
		let item: any = slopes.shift();		

		if(i === 0) { groups.push([item]); }
		else {
			let set = false;			
			for(let x = 0; x < groups.length; ++x) {
				if(groups[x][0].slope == item.slope) { 
					groups[x].push(item); 
					set = true;
				}
			}
			if(!set) {
				groups.push([item]);
			}
		}
		++i;
	}
	return groups;
}

function addSlopeAnnotations(slopesByGroup) {
	let label = 'Slopes: ';
	let labels: Array<any> = [];
	slopesByGroup.forEach((item) => {
		if(item[0].slope) {
			labels.push({ point: { x: Math.floor(item.length/2 + item[0].idx), y: 1 }, text: label + item[0].slope });
		}
	});
	return { labels: labels };
}

function addSlopeAnnotation(label: string, trend: number, target_var: number, brk_ind: number, local_std_err:number, slope: number) {

		if(brk_ind === 0) {
			return(slope);
		}

		// let yPos = 10;
		// let xPos = Math.min(trend - 1.5 * local_std_err, target_var).toFixed();
		// let value = slope.toFixed(2); 

		// return {
		// 	labels: {
		// 		text: label + value,
		// 		x: xPos,
		// 		y: yPos
		// 	}
		// }
}