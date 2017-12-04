
import { Component, OnInit } from '@angular/core'
import { Config } from '../app.config';
import { ChartData } from '../models/chartData.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Component({
	selector: '<home-page></home-page>',
	template: `
		<dummy-component [title]="title"></dummy-component>
		<chart-component [modificator]="'fullsize'" [data]="data"></chart-component>
	`
})

export class HomePageComponent {
	constructor(private config: Config) { console.log('HomePage component created.') }
	
	public title: String = this.config.appName + ": App is working!"	
	public data: Observable<ChartData>;

	ngOnInit() {
		this.data = this.getDataMock();
	}

	getDataMock() {
		return new Observable<ChartData>((observer) => {
			let chart: ChartData = {
				id: 'chart01',
				chart: {
					type: "bar"
				},
				title: {
					text: "Test Chart"
				},
				xAxis: {
					categories: ['Apples', 'Bananas', 'Oranges']
				},
				yAxis: {
					title: {
						text: 'Fruit eaten'
					}
				},
				series: [
					{
						name: 'Jane',
						data: [1, 0, 4]
					}, 
					{
						name: 'John',
						data: [5, 7, 3]
					}
				]
			}
			observer.next(chart);
			observer.complete();
		});
	}
}