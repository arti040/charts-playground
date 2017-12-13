/* Angular */
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

@Component({
	template: '<div class="user user--{{modificator}}"></div>',
	selector: 'user-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class UserComponent {

  @Input() answers: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator

  constructor() { console.log('User component created.') }

  ngOnInit() {}

}