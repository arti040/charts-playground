// /* Angular */
// import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import * as Typed from 'typed.js';  

// /* Models & Constants */
// import { sentence } from '../../constants/dialogs';
// import { onTypeEnded } from '../../constants/dialog.constants';

// @Component({
//   template: `
//     <div class="user user--{{modificator}}">
//       <button 
//         class="btn" 
//         *ngFor="let item of data | async" 
//         (click)="askSamanta({ answers: item.answers, action: null })"
//       >
//       {{item.beforeActionText[0]}}
//       </button>
//     </div>`,
// 	selector: 'user-component',
//     changeDetection: ChangeDetectionStrategy.OnPush
// })


// export class UserComponent {

//   @Input() data: any; // main data object
//   @Input() modificator: string; // CSS BEM class modificator
//   @Output() onAnswerSelected = new EventEmitter<onTypeEnded>(); 
  

//   private alive: boolean = true;

//   constructor() { console.log('User component created.') }

//   ngOnInit() {
//     if(!this.data) { return console.log('User Component: no data provided.') }
//   }

//   askSamanta(answers) {
//     this.onAnswerSelected.emit({ answers: answers });
//   }

//   ngOnDestroy() { this.alive = false; }

// }