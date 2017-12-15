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
      <span></span>
    </div>`,
	selector: 'typedtext-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class TypedtextComponent {

  @Input() data: Observable<Array<string>>; // main data object
  @Input() typedOpts?: typedOpts; // TODO - custom opts for typed.js
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onTypeEnded = new EventEmitter<onTypeEnded>(); 

  constructor() { console.log('Typedtext component created.'); }
  
  opts: typedOpts = {
    strings: [],
    typeSpeed: 20,
    backSpeed: 0,
    fadeOut: true
  }

  private alive: boolean = true;
  private action: any;
  private sentence: Typed = null;
  
  ngOnInit() {
    if(!this.data) { return console.log('Typedtext Component: no data provided.') }
    this.data.subscribe((res) => {
      if(!res) { return; }

      let opts = JSON.parse(JSON.stringify(this.opts));
      opts.strings = res;

      // opts.onComplete = (self) => { 
      //   this.onTypeEnded.emit({ answers: this.answers, action: this.action }); 
      // } 

      this.initTyped('span', this.sentence, opts);    

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