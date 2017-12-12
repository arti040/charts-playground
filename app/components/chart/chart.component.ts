
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { chartDataModel } from '../../models/chartData.model';
import { Observable } from 'rxjs/Observable';

@Component({
	template: '<chart class="chart chart--{{modificator}}" [options]="data | async"></chart>',
	selector: 'chart-component',
	changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChartComponent {

	@Input() data: Observable<Array<chartDataModel>>; // main data object
	@Input() modificator: string; // CSS BEM class modificator

	constructor() { console.log('Chart component created.') }
}