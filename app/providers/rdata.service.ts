// === RData Service
// @name RDataSvc
// @desc Handles RData retrieved form API
// @params none
// @returns none

/* Angular */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* Services */
import { ApiService } from './api.service';

/* Models & Constants */
import { chartRDataItemModel } from '../models/chartRData.model';
import { chartDataQuery } from '../constants/select';

@Injectable()
export class RDataSvc {
  constructor(private api: ApiService) { }


	/* Mocks */
  getMockRDataForChart(params: chartDataQuery) {
    return this.api.get('/api/chart.json');
	}
	
	getMockMainFiltersData() {
		return this.api.get('/api/filters.json');
	}

	/* Real calls */
	getMainFiltersData() {
		return this.api.get('endpoint here');
	}

	getRDataForChart(params: chartDataQuery) {
		let body = JSON.stringify(params);
		return this.api.get('endpoint here', body, null);
	}


}