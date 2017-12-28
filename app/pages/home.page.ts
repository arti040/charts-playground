
/* Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Services */
import { Config } from '../app.config';
import { RDataSvc } from '../providers/rdata.service';

/* Constants & Models */
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPageDialog } from '../constants/dialogs';
import { sentence, dialogGroup } from '../constants/dialogs';
import { labels } from '../constants/labels';
import { select, selectItem, chartDataQuery } from '../constants/select';

@Component({
	selector: '<home-page></home-page>',
	templateUrl: './home.page.html',
	providers: [RDataSvc]
})

export class HomePageComponent {
	constructor(private config: Config, private _rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public filtersVisible: boolean = false;
	public chartData: Observable<chartDataModel>;

	public typed_1: sentence; 
	public typed_2: sentence;
	public typed_3: sentence;

	public typed_1_start: BehaviorSubject<boolean>;
	public typed_2_start: BehaviorSubject<boolean>;
	public typed_3_start: BehaviorSubject<boolean>;


	
	ngOnInit() {
		this.setTypeds();
	}

	/* Typed */
	private setTypeds(): void {
		// TODO this could be dynamically created
		this.typed_1 = this.setTypedData(0, true);
		this.typed_2 = this.setTypedData(1, true);
		this.typed_3 = this.setTypedData(0);

		this.typed_1_start = new BehaviorSubject(this.typed_1.autostart);
		this.typed_2_start = new BehaviorSubject(this.typed_2.autostart);
		this.typed_3_start = new BehaviorSubject(this.typed_3.autostart);	
	}

	private setTypedData(idx, samanta?): sentence {
		let who = samanta ? 'samanta' : 'user'; 

		return { 
			autostart: this.dialog[who].sentences[idx].autostart, 
			text: this.dialog[who].sentences[idx].text, 
			action: this.dialog[who].sentences[idx].action 
		}
	}


	/* API handlers */
	private getChartData(params: chartDataQuery) {
		this._rdataSvc.getMockRDataForChart(params)
		.subscribe(
			res => this.chartData = new Observable(observer => {
			observer.next(parseChartData(res.json()));
		}))
	}	

	/* Event handlers */
	private showFilters() {	
		this.filtersVisible = true;
		this.typed_2_start.next(true);	
	}

	private handleSelected(e) {
		//console.log('handleSelected() returns: ', e);
		this.getChartData(e);
	}
}