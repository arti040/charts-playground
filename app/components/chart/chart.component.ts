// === Chart Component
// @name ChartComponent
// @desc It's a wrapper for true highcharts chart component
// @inputs data: chartDataModel, modificator: string (CSS class)


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
		!this.opts ? this.opts = this.data : this.chart.options = this.data;
	}
	
	private saveInstance(e):void {
		this.chart = e;
	}
}