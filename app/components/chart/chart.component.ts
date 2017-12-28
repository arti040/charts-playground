
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { chartDataModel } from '../../models/chartData.model';
import { Observable } from 'rxjs/Observable';

@Component({
	template: '<chart class="chart chart--{{modificator}}" ></chart>',
	selector: 'chart-component',
	changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChartComponent {

	@Input() data: Observable<Array<chartDataModel>>; // Main data object
	@Input() modificator: string; // CSS BEM class modificator

	ngOnChanges() {
		console.log('Chart component gets: ', this.data);
	}

	constructor() { console.log('Chart component created.') }
}