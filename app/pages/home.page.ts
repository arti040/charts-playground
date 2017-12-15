
/* Angular */
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Services */
import { Config } from '../app.config';
import { RDataSvc } from '../providers/rdata.service';

/* Constants & Models */
import { chartRDataItemModel } from '../models/chartRData.model';
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPageDialog } from '../constants/dialogs';
import { sentence } from '../constants/dialogs';

@Component({
	selector: '<home-page></home-page>',
	template: `
		<typedtext-component [data]="this.dialog.samanta.text[0]"></typedtext-component>
 		<!--<filters-component [data]="market"></filters-component>-->
		<typedtext-component [data]="this.dialog.samanta.text[1]"></typedtext-component>
  	<!--<chart-component class="chart-component" [data]="chartData"></chart-component>-->
		<!--<typedtext-component [data]="this.dialog.user.text[0]"></typedtext-component>-->
		<!--<filters-component [data]="periods"></filters-component>-->
  	<!--<table></table>-->	
	`
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public cahrtData: any;

	ngOnInit() {
		//this.data = this.getRDataMock().map(res => parseChartData(res.json()));
		this.dialog.samanta.text.forEach((item, idx) => {
			//create and apply dynamically created components;
			//let sentences = new BehaviorSubject<Array<string>>([item]);
		});
	}

	getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

}