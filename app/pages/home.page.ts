
/* Angular */
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/* Services */
import { Config } from '../app.config';
import { RDataSvc } from '../providers/rdata.service';
import { select } from '../constants/select';

/* Constants & Models */
import { chartRDataItemModel } from '../models/chartRData.model';
import { parseChartData } from '../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../models/chartData.model';
import { firstPageDialog } from '../constants/dialogs';
import { sentence, dialogGroup } from '../constants/dialogs';

@Component({
	selector: '<home-page></home-page>',
	templateUrl: './home.page.html' 
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public chartData: any;

	public typed_1: sentence; 
	public typed_2: sentence;
	public typed_3: sentence;

	public typed_1_start: BehaviorSubject<boolean>;
	public typed_2_start: BehaviorSubject<boolean>;
	public typed_3_start: BehaviorSubject<boolean>;

	public filters: BehaviorSubject<Array<Array<select>>> = new BehaviorSubject([]);

	
	ngOnInit() {
		//this.data = this.getRDataMock().map(res => parseChartData(res.json()));
		this.setTypeds();
		this.setFilters();
	}

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

	private getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

	private getFilters() {
		return this.rdataSvc.getMainFiltersData();
	}

	private showFilters() {
		console.log('Showing filters...');
		this.typed_2_start.next(true);
	}

	private setFilters() {
		this.getFilters().subscribe(res => {
			this.filters = new BehaviorSubject(this.parseFilters(res.json()));
		});
	}

	private parseFilters(obj) {
		let filters: Array<select> = [];
		let group: Array<Array<select>> = [];

		obj[0].productline.forEach(element => {
			filters.push({ group: 'productline', name: element.name, id: element.id });
		}); 

		

		group.push(filters,[{group: 'kpi'}],[{group: 'market'}]);
		console.log('hp sends: ', filters);
		return group;
	}

}