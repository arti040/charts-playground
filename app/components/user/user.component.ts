/* Angular */
import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  


@Component({
  template: `
    <div class="user user--{{modificator}}">
      <div *ngFor="let item of answers | async" (click)="askSamanta($event, { data: item })">
        {{item.text}}
      </div>
    </div>`,
	selector: 'user-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class UserComponent {

  @Input() answers: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onAnswerSeleced = new EventEmitter<{ data: Array<string> }>(); 
  

  private alive: boolean = true;

  constructor() { console.log('User component created.') }

  ngOnInit() {
    // this.answers
    // .takeWhile(() => this.alive)
    // .subscribe((res) => {
    //   console.log(res);
    // });
  }

  askSamanta(event, answers) {
    this.onAnswerSeleced.emit({ data: answers });
  }

  ngOnDestroy() { this.alive = false; }

}