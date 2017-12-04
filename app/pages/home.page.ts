
import { Component, OnInit } from '@angular/core'
import { Config } from '../app.config';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { chartRDataItemModel } from '../models/chartRData.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { parseChartData } from '../app.helpers';


@Component({
	selector: '<home-page></home-page>',
	template: `
		<dummy-component [title]="title"></dummy-component>
		<chart-component [modificator]="'fullsize'" [data]="data"></chart-component>
	`
})

export class HomePageComponent {
	constructor(private config: Config) { console.log('HomePage component created.') }
	
	public title: String = this.config.appName + ": App is working!"	
	public data: any;

	ngOnInit() {
		this.data = this.getRDataMock().map(data => parseChartData(data));
	}

	getRDataMock() {
		return new Observable<any>((observer) => {
			let chart: Array<chartRDataItemModel> = [
				{
					"DATE": "2014-09-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.3943,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0 
				},
				{
					"DATE": "2014-10-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.3004,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2014-11-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.9235,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2014-12-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 11.4765,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-01-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 11.9649,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-02-28",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.7231,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-03-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.0973,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-04-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.9829,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-05-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.5219,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-06-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 11.9541,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-07-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 10.8757,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": -1,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-08-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.5496,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-09-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.3568,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-10-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.3316,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-11-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.1951,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 1,
					"CI_INDICATOR": 1,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2015-12-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 11.2918,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-01-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.6877,
					"BREAKPOINT_INDICATOR": 1,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.9798,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 12.6082,
					"SLOPE": 0.0019,
					"BREAKPOINT_SHIFTS_ABS": 1.2913,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-02-29",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.8902,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-03-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.4305,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-04-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.1521,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-05-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.6367,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-06-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.2128,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-07-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 12.7762,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": -1,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-08-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 15.3134,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-09-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 15.167,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-10-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.1812,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-11-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.3318,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2016-12-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.5546,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-01-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 14.9895,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-02-28",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.8937,
					"BREAKPOINT_INDICATOR": 1,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7934,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 13.9315,
					"SLOPE": 0.0486,
					"BREAKPOINT_SHIFTS_ABS": 1.8304,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-03-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.8324,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7374,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 1,
					"INTERCEPT": 16.3933,
					"SLOPE": -1.8005,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-04-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 13.4976,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7374,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 16.3933,
					"SLOPE": -1.8005,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-05-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 11.6169,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7374,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 16.3933,
					"SLOPE": -1.8005,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-06-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 8.8682,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7374,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 16.3933,
					"SLOPE": -1.8005,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-07-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 7.1447,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": 0,
					"LOCAL_STANDARD_ERROR": 0.7374,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"INTERCEPT": 16.3933,
					"SLOPE": -1.8005,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-08-31",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 1.7211,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": -1,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"EARLY_WARNING_INDICATOR": 0
				},
				{
					"DATE": "2017-09-30",
					"MARKET": "TOTAL GREAT BRITAIN",
					"BRAND": "ARIEL",
					"MEASURE": "Val Shr",
					"TARGET_VAR": 0.1661,
					"BREAKPOINT_INDICATOR": 0,
					"OUTLIER_INDICATOR": -1,
					"LOCAL_OUTLIER_INDICATOR": 0,
					"CI_INDICATOR": 0,
					"EARLY_WARNING_INDICATOR": 0
				}
			];
			observer.next(chart);
			observer.complete();
		});
	}

	getDataMock() {
		return new Observable<chartDataModel>((observer) => {
			let chart: chartDataModel = {
				chart: {
					type: "bar"
				},
				title: {
					text: "Test Chart"
				},
				xAxis: {
					categories: ['Apples', 'Bananas', 'Oranges']
				},
				yAxis: {
					title: {
						text: 'Fruit eaten'
					}
				},
				series: [
					{
						name: 'Jane',
						data: [1, 0, 4]
					}, 
					{
						name: 'John',
						data: [5, 7, 3]
					}
				]
			}
			observer.next(chart);
			observer.complete();
		});
	}
}