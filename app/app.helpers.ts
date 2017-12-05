import { ChartData, chartDataModel } from './models/chartData.model';

export function parseChartData(rdata) {
	let chartData: chartDataModel = new ChartData();

	let valShr = { color: '#06c', data: [], name: 'Val Shr' }	
	let trend = { color: '#036', data: [], name: 'Trend' }
	let localOutliner = { color: '#ffa500', data: [], type: 'scatter', dataLabels: { enabled: true, format: '{ point.y:.2f }' }, name: 'Local Outliner' }
	let globalOutliner = { color: '#f00', data: [], name: 'Global Outliner' }
	let range = { color: '#9DC3E3', data: [], name: 'Range' }
	
	chartData.marginRight = 220;
	chartData.legend = { align: 'right', verticalAlign: 'middle', layout: 'vertical', floating: false }
	chartData.series.push(valShr, trend, localOutliner, globalOutliner, range);

	rdata.forEach((item) => {
		chartData.title.text = [item.MARKET,item.BRAND,item.MEASURE].join(' ');
		chartData.xAxis.categories = [];
		chartData.xAxis.categories.push(item.DATE);
		
		chartData.series[0].data.push(item.TARGET_VAR);
		chartData.series[1].data.push(countTrend(item.INTERCEPT, item.SLOPE));
		chartData.series[2].data.push(countLocalOutliner(item.LOCAL_OUTLIER_INDICATOR, item.TARGET_VAR));
		//chartData.series[3].data.push();
		//chartData.series[4].data.push(countRange(countTrend(item.INTERCEPT, item.SLOPE), item.LOCAL_STANDARD_ERROR));
		//chartData.series[4].type = 'arearange';
		//chartData.series[4].fillOpacity = 0.3;
		//chartData.series[4].zIndex= -1;

	});
	return chartData;
}

function countTrend(val: number, slope: number) {	
	if(!slope) { return null; }
	return val == 1 ? val + slope : val - 1 + slope;
}
function countRange(trend: number, loc_st_err: number) {
	if(!loc_st_err) { return [null, null]; }
	let low = trend - 1.5 * loc_st_err;
	let high = trend + 1.5 * loc_st_err;
	return [low, high];
}

function countLocalOutliner(loc_out_ind: number, val: number) {
	if(!loc_out_ind || loc_out_ind == 0) { return null; }
	return val;
}
