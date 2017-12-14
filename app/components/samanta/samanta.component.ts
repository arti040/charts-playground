/* Angular */
import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence } from '../../constants/dialogs';

@Component({
	template: '<div class="sentence sentence--{{modificator}}"><span></span></div>',
	selector: 'samanta-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SamantaComponent {

  @Input() data: Observable<sentence>; // main data object
  @Input() typedOpts?: any; // TODO - custom opts for typed.js
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onTypeEnded = new EventEmitter<{ data: Array<string> }>(); 

  constructor() { console.log('Samanta component created.') }
  
  opts: any = {
    strings: [],
    typeSpeed: 10,
    backSpeed: 0,
    fadeOut: true,
    onComplete: (self) => {
      this.onTypeEnded.emit({ data: this.next });
    }
  }

  private alive: boolean = true;
  private sentence: any = null;
  private next: any; 
  
  ngOnInit() {
    if(!this.data) { return console.log('Samanta Component: no data provided.') }
    this.data.subscribe((res) => {
      if(!res) { return; }
      this.sentence && this.sentence.destroy();
      this.opts.strings = res[0].text;
      this.next = { answers: res[0].answers, action: res[0].action || null };

      this.sentence = new Typed('span', this.opts);
    });   
  }

  ngOnDestroy() { this.alive = false; }  

}