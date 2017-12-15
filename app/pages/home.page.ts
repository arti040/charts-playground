
/* Angular */
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/* Services */
import { Config } from '../app.config';
import { RDataSvc } from '../providers/rdata.service';

/* Constants & Models */
import { chartRDataItemModel } from '../models/chartRData.model';
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPage } from '../constants/dialogs';


@Component({
	selector: '<home-page></home-page>',
	template: `
		<dialog-component [dialog]="dialog"></dialog-component>
	`
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public dialog = firstPage;

	public title: String = this.config.appName + ": App is working!"	
	public data: any;

	ngOnInit() {
		this.data = this.getRDataMock().map(res => parseChartData(res.json()));
	}

	getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

}