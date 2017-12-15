/* Angular */
import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence } from '../../constants/dialogs';
import { typedOpts, onTypeEnded } from '../../constants/dialog.constants';

@Component({
  template: `
    <div class="sentence sentence--{{modificator}}">
      <div class="sentence__first"></div>
      <div class="sentence__actions">
        <ng-template #actions></ng-template>
      </div>
      <div class="sentence__second"></div>
    </div>`,
	selector: 'samanta-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SamantaComponent {

  @Input() data: Observable<sentence>; // main data object
  @Input() typedOpts?: typedOpts; // TODO - custom opts for typed.js
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onTypeEnded = new EventEmitter<onTypeEnded>(); 

  constructor() { console.log('Samanta component created.'); }
  
  opts: typedOpts = {
    strings: [],
    typeSpeed: 20,
    backSpeed: 0,
    fadeOut: true,
    showCursor: false
  }

  private alive: boolean = true;
  private firstSentence: Typed = null;
  private secondSentence: Typed = null;
  private action: any;
  private answers: any; 
  
  ngOnInit() {
    if(!this.data) { return console.log('Samanta Component: no data provided.') }
    this.data.subscribe((res) => {
      console.log(res);

      if(!res) { return; }
      this.action =  res[0].action || null;
      this.answers = res[0].answers;

      let fopts = JSON.parse(JSON.stringify(this.opts));
      let sopts = JSON.parse(JSON.stringify(this.opts));

      fopts.strings = res[0].beforeActionText;
      fopts.onComplete = (self) => { 
        self.showCursor = false;
        this.onTypeEnded.emit({ answers: this.answers, action: this.action }); 
      } 

      if(res[0].afterActionText) {
        sopts.strings = res[0].afterActionText;
        this.initTyped('.sentence__second', this.secondSentence, sopts);
      }

      this.initTyped('.sentence__first', this.firstSentence, fopts);
      

    });   
  }

  initTyped(el, sentence, opts) {
    // Remove instance of Typed if any exists.
    // Typed.restart() seems to not work...
    sentence && sentence.destroy();
    sentence = new Typed(el, opts);
  }

  ngOnDestroy() { this.alive = false; }  

}