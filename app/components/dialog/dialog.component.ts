/* Angular */
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence } from '../../constants/dialogs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    template: `
        <div class="dialog sentence--{{modificator}}">
            <samanta-component [modificator]="'fullsize'" [data]="samanta" (onTypeEnded)="setUserSentence($event)"></samanta-component>
            <user-component [modificator]="'fullsize'" [data]="user" (onAnswerSelected)="setSamantaSentence($event)"></user-component>
        </div>
    `,
	selector: 'dialog-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class DialogComponent {

  @Input() dialog: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  
  private samanta: BehaviorSubject<Array<sentence>>;
  private user = new Subject<Array<sentence>>();

  constructor() { console.log('Dialog component created.') }

  ngOnInit() {
    this.samanta = new BehaviorSubject<Array<sentence>>([this.dialog.samanta[0]]);
  }

  setUserSentence(event) {
      this.user.next(this.findAnswers(this.dialog.user, event.data));
  }

  setSamantaSentence(event) {
      console.log(event);
    this.samanta.next(this.findAnswers(this.dialog.samanta, event.data));
  }

  findAnswers(source, names) {
    if(!names || !names.length) { return null; }
    let answers = [];
    names.forEach((name) => {
        source.forEach((answer) => {
            if(answer.name === name) {
                answers.push(answer);
            }
        });
    });  
    return answers;
  }

}