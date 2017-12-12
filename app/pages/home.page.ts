
/* Angular */
import { Component, OnInit } from '@angular/core'

/* Services */
import { Config } from '../app.config';
import { RDataSvc } from '../providers/rdata.service';

/* Constants & Models */
import { chartRDataItemModel } from '../models/chartRData.model';
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';


@Component({
	selector: '<home-page></home-page>',
	template: `
		<dummy-component [title]="title"></dummy-component>
		<chart-component [modificator]="'fullsize'" [data]="data"></chart-component>
	`
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public title: String = this.config.appName + ": App is working!"	
	public data: any;

	ngOnInit() {
		this.data = this.getRDataMock().map(res => parseChartData(res.json()));
	}

	getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

}