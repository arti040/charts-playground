/* Angular */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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

  @Input() question: Observable<sentence>; // main data object
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

  private sentence: any = null;
  private next: any; 
  
  ngOnInit() {
    if(!this.question) { return console.log('Samanta Component: no data provided.') }
    this.question.subscribe((res) => {
      this.sentence && this.sentence.destroy();
      this.opts.strings = res.text;
      this.next = res.answers;
      this.sentence = new Typed('span', this.opts);
    });   
  }

}