
/* Angular */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
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
import { labels } from '../constants/labels';
import { select, selectItem } from '../constants/select';

@Component({
	selector: '<home-page></home-page>',
	templateUrl: './home.page.html' 
})

export class HomePageComponent {
	constructor(private config: Config, private rdataSvc: RDataSvc, private cd: ChangeDetectorRef ) { console.log('HomePage component created.') }
	
	public dialog = firstPageDialog;
	public chartData: any;

	public typed_1: sentence; 
	public typed_2: sentence;
	public typed_3: sentence;

	public typed_1_start: BehaviorSubject<boolean>;
	public typed_2_start: BehaviorSubject<boolean>;
	public typed_3_start: BehaviorSubject<boolean>;

	private rawFilters: Array<any>;
	private filtersArr: Array<select> = [];
	public filters$: BehaviorSubject<Array<select>> = new BehaviorSubject([]);

	
	ngOnInit() {
		//this.data = this.getRDataMock().map(res => parseChartData(res.json()));
		//this.setTypeds();
		
		this.setFilters();
	}


	/* Parsers */
	private getMainNodes() {
		let filters: select = {
			label: null,
			next: labels.kpi,
			data: []
		}
		this.rawFilters.forEach(node => {
			filters.label = Object.keys(node)[0];
			node.productline.forEach((item, idx) => {
				let filter: selectItem = { name: item.name, id: item.id };
				filter.selected = idx === 0;
				filters.data.push(filter);
			});
		});
		console.log(filters);
		return filters;
	}

	private getKpiFilters(node) {
		let filters: select = {
			label: labels.kpi,
			next: labels.market,
			data: []
		}		
		this.rawFilters[0].productline.forEach((item) => { 
			if(item.id === node) {
				filters.data = item.kpi;
				filters.data[0].selected = true;
			}
		});

		console.log(filters);
		return filters;
	}

	private getMarketFilters(node) {
		let filters: select = {
			label: labels.market,
			next: labels.sharebase,
			data: []
		}	
		
		this.rawFilters[0].productline.forEach((item) => { 
			if(item.id === node) {
				item.kpi.forEach(kpi => {
					kpi.market.forEach(market => {
						filters.data.push(market);
					});
					filters.data[0].selected = true;
				});
			}
		});

		console.log(filters);
		return filters;
	}

	private getSharebaseFilters(node) {
		let filters: select = {
			label: labels.sharebase,
			next: null,
			data: []
		}	
		
		this.rawFilters[0].productline.forEach((item) => { 
			if(item.id === node) {
				item.kpi.forEach(kpi => {
					kpi.market.forEach(market => {
						filters.data = market.sharebase;	
					});
				});
			}
		});

		console.log(filters);
		return filters;
	}

	private setFilters() {
		this.getFilters()
		.subscribe(res => {
			this.rawFilters = res.json();
			this.filtersArr.push(this.getMainNodes());
			// this.getMainNodes();
			// this.getKpiFilters('pg');
			// this.getMarketFilters('pg');
			// this.getSharebaseFilters('pg');
			this.filters$.next(this.filtersArr);
		});
	}

	private createEmptySelect(count) {
		let i = count;
		let empties = [];
		let select: select = { label: null, data: [], next: null }
		while(i){
			empties.push(select);
			--i;
		}
		console.log('empeties: ', empties);
		return empties;
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


	/* API */
	private getRDataMock() {
		return this.rdataSvc.getRDataForChart();
	}

	private getFilters() {
		return this.rdataSvc.getMainFiltersData();
	}

	private getChartData() {

	}	

	/* Event handlers */
	private showFilters() {
		console.log('Showing filters...');
		this.typed_2_start.next(true);
	}

	private handleSelected(event) {
		console.log('hp receives: ', event);	
		let copy = this.filtersArr;
		this.filtersArr = [];	

		if(event.next === labels.kpi) {
			copy.push(this.getKpiFilters(event.id));
			this.filters$.next(copy);
			this.filtersArr = copy;
		}
		else if(event.next === labels.market) {
			this.getMarketFilters(event.id);
		}
		else if(event.next === labels.sharebase) {
			this.getSharebaseFilters(event.id);
		}
		else { return null; }
	}
}