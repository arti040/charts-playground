
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
import { sentence, dialogGroup } from '../constants/dialogs';

@Component({
	selector: '<home-page></home-page>',
	template: `
		<typedtext-component [data]="this.typed_1"></typedtext-component><br>
 		<!--<filters-component [data]="market"></filters-component>-->
		<typedtext-component [data]="this.typed_2"></typedtext-component><br>
  	<!--<chart-component class="chart-component" [data]="chartData"></chart-component>-->
		<typedtext-component [data]="this.typed_3"></typedtext-component>
		<!--<filters-component [data]="periods"></filters-component>-->
  	<!--<table></table>-->	
	`
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public chartData: any;

	public typed_1: sentence; 
	public typed_2: sentence;
	public typed_3: sentence;

	ngOnInit() {
		//this.data = this.getRDataMock().map(res => parseChartData(res.json()));
		this.setTypeds();
	}

	setTypeds(): void {
		// TODO this could be dynamically created
		this.typed_1 = this.setTypedData(0, true);
		this.typed_2 = this.setTypedData(1, true);
		this.typed_3 = this.setTypedData(0);
	}

	setTypedData(idx, samanta?): sentence {
		let who = samanta ? 'samanta' : 'user'; 

		return { 
			autostart: this.dialog[who].sentences[idx].autostart, 
			text: this.dialog[who].sentences[idx].text, 
			action: this.dialog[who].sentences[idx].action 
		}
	}

	getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

}