/* Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

/* Services */
import { RDataSvc } from '../providers/rdata.service';

/* Constants & Models */
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPageDialog, pageDialog } from '../constants/dialogs';
import { sentence, dialogGroup } from '../constants/dialogs';
import { labels } from '../constants/labels';
import { select, selectItem, chartDataQuery } from '../constants/select';
import { ngx } from '../constants/ngx'; 


@Component({
	selector: '<home-page></home-page>',
	templateUrl: './home.page.html',
	providers: [RDataSvc]
})

export class HomePageComponent {
	constructor(private _rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	private alive: boolean = true;

	public dialog: pageDialog = firstPageDialog;
	public filtersVisible: boolean = false;
	
	private rawChartData: chartDataModel;
	public chartData: Subject<chartDataModel> = new Subject();

	private rawSmallTableData: ngx;
	public smallTableData: Subject<ngx> = new Subject();

	public typed_1: sentence; 
	public typed_2: sentence;

	public typed_1_start: BehaviorSubject<boolean>;
	public typed_2_start: BehaviorSubject<boolean>;
	
	ngOnInit() {
		this.setTypeds();
		this.getSmallTableData();
	}

	/* Typed */
	private setTypeds(): void {
		this.typed_1 = this.setTypedData(0, true);
		this.typed_2 = this.setTypedData(1, true);

		this.typed_1_start = new BehaviorSubject(this.typed_1.autostart);
		this.typed_2_start = new BehaviorSubject(this.typed_2.autostart);
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
			(res) => {
				this.rawChartData = parseChartData(res.json());
				this.chartData.next(this.rawChartData);
		});
	}	
	private getSmallTableData() {
		this._rdataSvc.getDataForSmallTable()
		.takeWhile(() => this.alive )
		.subscribe(
			(res) => {
				this.rawSmallTableData = res.json();
				this.smallTableData.next(this.rawSmallTableData);
		});
	}

	/* Event handlers */
	private showFilters():void {	
		this.filtersVisible = true;
		this.typed_2_start.next(true);	
	}
	private handleSelected(e):void {
		this.getChartData(e);
	}
}