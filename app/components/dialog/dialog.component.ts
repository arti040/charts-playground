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
            <samanta-component [modificator]="'fullsize'" [question]="question" (onTypeEnded)="setAnswers($event)"></samanta-component>
            <user-component [modificator]="'fullsize'" [answers]="answers" (onAnswerSelected)="setAnswers($event)"></user-component>
        </div>
    `,
	selector: 'dialog-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class DialogComponent {

  @Input() dialog: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  
  private samanta: BehaviorSubject<sentence>;
  private user = new Subject<Array<sentence>>();

  constructor() { console.log('Dialog component created.') }

  ngOnInit() {
    this.samanta = new BehaviorSubject<sentence>(this.dialog.samanta[0]);
    this.samanta.next(this.dialog.samanta[0]);
  }

  setUserAnswers(event) {
      this.user.next(this.findAnswers(this.dialog.user, event.data));
  }

  setSamantaSentence(event) {
    //this.samanta.next(this.findAnswers(this.dialog.samanta, event.data));
    console.log(event.data);
  }

  findAnswers(where, names) {
    let answers = [];
    names.forEach((name) => {
        this.dialog[where].forEach((answer) => {
            if(answer.name === name) {
                answers.push(answer);
            }
        });
    });  
    return answers;
  }

}