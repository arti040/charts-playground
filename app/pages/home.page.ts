
/* Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Services */
import { Config } from '../app.config';

/* Constants & Models */
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPageDialog } from '../constants/dialogs';
import { sentence, dialogGroup } from '../constants/dialogs';
import { labels } from '../constants/labels';
import { select, selectItem } from '../constants/select';

@Component({
	selector: '<home-page></home-page>',
	templateUrl: './home.page.html' 
})

export class HomePageComponent {
	constructor(private config: Config) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public chartData: any;

	public typed_1: sentence; 
	public typed_2: sentence;
	public typed_3: sentence;

	public typed_1_start: BehaviorSubject<boolean>;
	public typed_2_start: BehaviorSubject<boolean>;
	public typed_3_start: BehaviorSubject<boolean>;

	private rawFilters: any;
	private filtersArr: Array<select> = [];
	public filters$: BehaviorSubject<Array<select>> = new BehaviorSubject([]);

	
	ngOnInit() {
		//this.data = this.getRDataMock().map(res => parseChartData(res.json()));
		//this.setTypeds();
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
	private getChartData() {

	}	

	/* Event handlers */
	private showFilters() {
		console.log('Showing filters...');
		this.typed_2_start.next(true);
	}

	private handleSelected(e) {
		console.log(e);
	}
}