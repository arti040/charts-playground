import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '<dummy-component></dummy-component>',
  template: '<h1>{{ mainTitle }}</h1>',
})
export class DummyComponent {

	@Input() title: string;
	public mainTitle: string;
	
	constructor() {
		console.log('DummyComponent\'s saying Yo!');
	}

	ngOnInit() {
		this.mainTitle = this.title || 'Dummy Title';		
	}
}