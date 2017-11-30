
import { Component } from '@angular/core'
import { Config } from '../app.config';


@Component({
	selector: '<home-page></home-page>',
	template: '<dummy-component [title]="title"></dummy-component>'
})

export class HomePageComponent {
	constructor(private config: Config) {}
	title: String = this.config.appName + ": App is working!"	
}