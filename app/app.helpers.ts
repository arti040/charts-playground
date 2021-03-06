
import { labels } from './constants/labels';
import { colors } from './constants/chartColors';
import { ChartData, chartDataModel } from './models/chartData.model';
import { chartOpts, breakLabelOpts, rangeOpts, periodLabelOpts, serieOpts, breakOpts, periodOpts } from './constants/chartOpts';  


export function parseChartData(rdata) {
	let chartData: chartDataModel = new ChartData();

	var trend: number = null;
	var breaks: Array<any> = [];
	var annotations: Array<any> = [];
	var slopes: Array<any> = [];
	
	chartData.chart = Object.assign(chartData, chartOpts);
	Object.keys(serieOpts).map(key => chartData.series.push(serieOpts[key]));
	chartData.series[4] = Object.assign({}, chartData.series[4], rangeOpts);

	rdata.forEach((item, idx, rdata) => {

		// Counting trend
		let oldTrend = trend;
		trend = countTrend(rdata, oldTrend, idx, item.SLOPE, item.INTERCEPT);		
		let len = rdata.length;	
		
		// Creating charts' title
		chartData.title.text = [item.MARKET,item.BRAND,item.MEASURE].join(' ');

		// Pushing series' dates as xAxis
		chartData.xAxis.categories.push(item.DATE);
		
		// Pushing series` data in an order: 
		// target_var, trend, local_outlier, global_outlier, range
		let series = [
			item.TARGET_VAR,
			trend,
			countOutlier(item.LOCAL_OUTLIER_INDICATOR, item.TARGET_VAR),
			countOutlier(item.OUTLIER_INDICATOR, item.TARGET_VAR),
			countRange(trend, item.LOCAL_STANDARD_ERROR)
		];

		chartData.series.forEach((item, idx) => {
			item.data.push(series[idx]);
		})
		
		// Generating breaks and periods
		breaks.push(addPlotBreaks(breakOpts, idx, item.BREAKPOINT_INDICATOR, item.BREAKPOINT_SHIFTS_ABS));
		breaks = breaks.concat(addPeriods(periodOpts, idx, item.BREAKPOINT_INDICATOR, item.EARLY_WARNING_INDICATOR));

		slopes.push(getSlope(idx, item.SLOPE));	
	});

	// Remove empty elements from Array
	chartData.xAxis.plotBands = breaks.filter((e) => { return e; });

	// Generating slopes` labels
	chartData.annotations = addSlopeAnnotations(groupSlopes(slopes));

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

function countOutlier(out_ind: number, target_var: number) {
	return !out_ind || out_ind == 0 ? null : target_var;
}

function countOutlierIndicator(out_ind, target_var) {
	return !out_ind || out_ind == 0 ? null : target_var;
}

function addPlotBreaks(opts: any, idx: number, brk_ind: number, brk_shifts_abs: number) {	
		let copy = JSON.parse(JSON.stringify(opts));
		if(brk_ind === 1) {		
			copy.from = idx-1;
			copy.to = idx;
			brk_shifts_abs > 0 ? copy.color = colors.green : copy.color = colors.rose;
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

function getSlope(idx: number, slope: number) {
	return { idx, value: slope || null };
}

function groupSlopes(slopes: Array<any>) {

	let groups: Array<any> = [];
	let i: number = 0;

	while(slopes.length) {
		let slope: any = slopes.shift();		

		if(i === 0) { groups.push([slope]); }
		else {
			let set = false;			
			for(let x = 0; x < groups.length; ++x) {
				if(groups[x][0].value == slope.value) { 
					groups[x].push(slope); 
					set = true;
				}
			}
			if(!set) {
				groups.push([slope]);
			}
		}
		++i;
	}
	return groups;
}

function addSlopeAnnotations(slopesByGroup) {
	console.log(slopesByGroup)
	let text = labels.slopes + ': ';
	let anns = [];
	slopesByGroup.forEach((group) => {
		if(group[0].value) {
			anns.push({
				xValue: group.length/2 + group[0].idx, 
				yValue: 0,
				xAxis: 0,
				title: { text: text + group[0].value }
			});
		}
	});
	return anns;
}