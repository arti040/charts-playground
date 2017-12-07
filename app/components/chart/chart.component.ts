
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { chartDataModel } from '../../models/chartData.model';
import { Observable } from 'rxjs/Observable';

@Component({
	template: '<chart class="chart chart--{{modificator}}" [options]="options"></chart>',
	selector: 'chart-component',
	changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChartComponent implements OnInit, OnDestroy {

	@Input() data: Observable<Array<chartDataModel>>; // main data object
	@Input() modificator: string; // CSS BEM class modificator

	public options: Array<chartDataModel>;
	private alive: boolean = true;

	constructor() { console.log('Chart component created.') }

	ngOnInit() {
		this.data
		.takeWhile(() => this.alive )
		.subscribe((r) => {
			//console.log(r);
			this.options = r;
		});	
	}

	ngOnDestroy() { this.alive = false; }

}