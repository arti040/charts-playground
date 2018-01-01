// === Dialog Service
// @name DialogSvc
// @desc Handles Dialog related actions. Unused now but I decided to left it, just in case.

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
	
	SHOW_FILTERS() {
		console.log('Showing filters...');
	}

}