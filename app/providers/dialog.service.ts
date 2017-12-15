// === Dialog Service
// @name DialogSvc
// @desc Handles Dialog related actions
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
export class DialogSvc {
  constructor(private api: ApiService) { }

	SHOW_CHART() { 
    return true;
	}
	
	SHOW_FILTERS() {
		console.log('Showing filters...');
	}

}