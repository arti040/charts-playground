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

/* Models */
import { chartRDataItemModel } from '../models/chartRData.model';


@Injectable()
export class RDataSvc {
  constructor(private api: ApiService) { }

  getRDataForChart(params?) {
    return this.api.get('/api/chart.json', null);
	}
	
	getMainFiltersData(params?) {
		return this.api.get('/api/filters.json', null);
	}

}