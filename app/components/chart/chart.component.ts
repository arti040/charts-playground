
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { chartDataModel } from '../../models/chartData.model';
import { Observable } from 'rxjs/Observable';

@Component({
	template: '<chart class="chart chart--{{modificator}}" [options]="opts" (load)="saveInstance($event)"></chart>',
	selector: 'chart-component',
	changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChartComponent {

	@Input() data: chartDataModel; // Main data object
	@Input() modificator: string; // CSS BEM class modificator

	private chart: any;
	private opts: chartDataModel;

	ngOnChanges() {
		console.log('Chart component gets: ', this.data);
		!this.opts ? this.opts = this.data : this.chart.options = this.data;
	}

	ngOnInit() {}

	constructor() { console.log('Chart component created.') }

	private saveInstance(e) {
		this.chart = e;
	}
}