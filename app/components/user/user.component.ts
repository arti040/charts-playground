/* Angular */
import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence } from '../../constants/dialogs';

@Component({
  template: `
    <div class="user user--{{modificator}}">
      <button [ngClass]="{ 'visible': item.text.length }" class="btn" *ngFor="let item of data | async" (click)="askSamanta($event, { data: { answers: item.answers, action: null } })">{{item.text}}</button>
    </div>`,
	selector: 'user-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class UserComponent {

  @Input() data: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onAnswerSelected = new EventEmitter<Array<string>>(); 
  

  private alive: boolean = true;

  constructor() { console.log('User component created.') }

  ngOnInit() {
    if(!this.data) { return console.log('User Component: no data provided.') }
  }

  askSamanta(event, answers) {
    this.onAnswerSelected.emit(answers);
  }

  ngOnDestroy() { this.alive = false; }

}