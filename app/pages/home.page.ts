
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
import { mainDialog } from '../constants/dialogs';


@Component({
	selector: '<home-page></home-page>',
	template: `
		<samanta-asks-component [modificator]="'fullsize'" [data]="sentence"></samanta-asks-component>

		<div>
			<button (click)="setSentence()">Talk to me!</button>
		</div>
		<!-- <chart-component [modificator]="'fullsize'" [data]="data"></chart-component>-->
	`
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public title: String = this.config.appName + ": App is working!"	
	public data: any;

	public sentences: Array<Array<string>> = [
		['Nice night for a walk, he?', 'Wash day tomorrow. Nothing clean, right?'],
		['Nothing clean. Right.'],
		['I think this guy\'s a couple of cans short of a six-pack.'],
		['Your clothes, give them to me.'],
		['You won\'t be needing any clothes.']
	];
	private counter = 0;
	public sentence = new Subject();

	ngOnInit() {
		this.data = this.getRDataMock().map(res => parseChartData(res.json()));
	}

	getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

	setSentence() {
		this.sentence.next(this.sentences[this.counter]);
		this.counter < this.sentences.length-1 ?
			this.counter++ : this.counter = 0;
	}

}