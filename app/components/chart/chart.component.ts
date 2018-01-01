
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { chartDataModel } from '../../models/chartData.model';

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
	
	constructor() { console.log('Chart component created.') }
	
	ngOnChanges(): void {
		//console.log('Chart component gets: ', this.data);
		!this.opts ? this.opts = this.data : this.chart.options = this.data;
		console.log(this.chart);
	}
	
	private saveInstance(e):void {
		this.chart = e;
	}
}