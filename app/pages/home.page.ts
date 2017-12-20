
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

	private rawFilters: Array<any>;
	private filtersArr: Array<Array<select>>;
	public filters$: BehaviorSubject<Array<Array<select>>> = new BehaviorSubject([]);

	
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
		this.getFilters()
		.subscribe(res => {
			this.rawFilters = res.json();
			this.filtersArr = this.parseFilters(this.rawFilters);
			this.filters$ = new BehaviorSubject(this.filtersArr);
		});
	}

	private parseFilters(obj) {
		let filters: Array<select> = [];
		let group: Array<Array<select>> = [];

		obj[0].productline.forEach((element,idx) => {
			let item: select = { parent: null, group: 'productline', children: 'kpi', name: element.name, id: element.id };
			if(idx === 0) { item.selected = true }
			filters.push(item);
		}); 

		group.push(filters);
		console.log('hp sends: ', filters);
		return group;
	}

	private getChartData(filters) {

	}

	private getKpi(from: string) {
		let filters: Array<select> = [];
		this.rawFilters[0].productline.forEach((element, idx) => {
			if(element.id === from) {
				
				element.kpi.forEach(kpiElement => {
					let item: select = { parent: element.id, group: 'kpi', children: 'market', name: kpiElement.name, id: kpiElement.id };
					if(idx === 0) { item.selected = true }
					filters.push(item);
				});

				this.filtersArr.push(filters);
				let a = this.filtersArr
				this.filters$.next([]);
				this.filters$.next(this.filtersArr);
			}
		});
	}

	private getMarket(from: string) {
		let filters: Array<select> = [];
		this.rawFilters[0].productline.forEach(element => {
			if(element.id === from) {
				element.market.forEach((marketElement, idx) => {
					let item: select = { group: 'market', children: null, name: marketElement.name, id: marketElement.id };
					if(idx === 0) { item.selected = true }
					filters.push(item);
				});

				this.filtersArr.push(filters);
				console.log('Market: ', this.filtersArr);
				this.filters$.next(this.filtersArr);
			}
		});
	}

	private handleSelected(event) {
		console.log('hp receives: ', event);	
		if(event.children === 'kpi') {
			this.getKpi(event.id);
		}
		else if(event.children === 'market') {
			this.getMarket(event.id);
		}
		else { return null; }
	}
}