// === Selects Service
// @name SelectsSvc
// @desc Handles Select-group/seelct component data flow
// @params none
// @returns none

/* Angular */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Services */
import { ApiService } from './api.service';
import { RDataSvc } from './rdata.service';


/* Models & Constants */
import { labels } from '../constants/labels';
import { select, selectItem } from '../constants/select';


@Injectable()
export class SelectsSvc {
  constructor(private api: ApiService, private rdataSvc: RDataSvc) { 
    console.log('SelectsSvc: fire!');
  }

  public getFilters() {
		return this.rdataSvc.getMainFiltersData();
  }

  public getMainNodes(from) {   
		let filters: select = {
			label: null,
			next: labels.kpi,
			data: []
		}
		from.forEach(node => {
			filters.label = Object.keys(node)[0];
			node.productline.forEach((item, idx) => {
				let filter: selectItem = { name: item.name, id: item.id };
				filters.data.push(filter);
			});
		});
		//console.log(filters);
		return filters;
	}

	public getKpiFilters(from, id) {
		let filters: select = {
			label: labels.kpi,
			next: labels.market,
			data: []
    }		
		from[0].productline.forEach((item) => { 
			if(item.id === id) {
				filters.data = item.kpi;
			}
		});

		// console.log(filters);
		return filters;
	}

	public getMarketFilters(from, id, kpi_id) {

		let filters: select = {
			label: labels.market,
			next: labels.sharebase,
			data: []
    }	
    		
		from[0].productline.forEach((item) => { 
			if(item.id === id) {
				item.kpi.forEach(kpi => {
          if(kpi.id === kpi_id) {
            kpi.market.forEach(market => {
              filters.data.push(market);
            });
         }
				});
			}
		});

		//console.log(filters);
		return filters;
	}

	public getSharebaseFilters(from, id, kpi_id, market_id) {

		let filters: select = {
			label: labels.sharebase,
			next: 'null',
			data: []
    }	
		
		from[0].productline.forEach((item) => { 
			if(item.id === id) {
				item.kpi.forEach(kpi => {
					if(kpi.id === kpi_id) {
						kpi.market.forEach(market => {
							if(market.id === market_id) {
								market.sharebase.forEach(item => {								
									filters.data.push({ name: item, id: 'null' });	
								});
							}
					});
					}
				});
			}
		});

		//console.log('f: ', filters);
		return filters;
  }
  
}