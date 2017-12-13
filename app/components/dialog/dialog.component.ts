/* Angular */
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence } from '../../constants/dialogs';


@Component({
    template: `
        <div class="dialog sentence--{{modificator}}">
            <samanta-component [modificator]="'fullsize'" [question]="question" (onTypeEnded)="setAnswers($event)"></samanta-component>
            <user-component [modificator]="'fullsize'" [answers]="answers"></user-component>
        </div>
    `,
	selector: 'dialog-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class DialogComponent {

  @Input() dialog: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  
  private question: Observable<sentence>;

  constructor() { console.log('Dialog component created.') }

  ngOnInit() {
    this.question = new Observable((observer) => { 
        observer.next(this.dialog.samanta[0]); 
    });
  }

  setAnswers(event) {
      console.log(event.data);
  }

}