
import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ChartData } from '../../models/chartData.model';
import { Observable } from 'rxjs/Observable';
// import * as Highcharts from 'highcharts';
// import * as HighchartsMore from 'highcharts/highcharts-more.src.js';

@Component({
	templateUrl: './chart.template.html',
	selector: 'chart-component',
	changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChartComponent implements OnInit, OnDestroy {

	@Input() data: Observable<ChartData>; // main data object
	@Input() modificator: string; // CSS BEM class modificator
	
	//public chart: any = {}
	//public chartId: string;
	public options: ChartData;

	private alive: boolean = true;

	constructor() { console.log('Chart component created.') }

	ngOnInit() {
		//HighchartsMore(Highcharts);	

		this.data
		.takeWhile(() => this.alive )
		.subscribe((r) => { 
			this.options = r;			
			//this.chartId = r.id; 
			//setTimeout(() => { this.chart = Highcharts.chart(this.chartId, this.chartData) }, 0);
		});	
	}

	ngOnDestroy() {
		this.alive = false;
	}

}