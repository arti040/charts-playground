/* Angular */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

@Component({
	template: '<div class="sentence sentence--{{modificator}}"><span></span></div>',
	selector: 'samanta-asks-component'
  //changeDetection: ChangeDetectionStrategy.OnPush
})


export class SamantaAsksComponent {

  @Input() data: Observable<Array<string>>; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  @Output() onTypeEnded = new EventEmitter<boolean>(); 

  constructor() { console.log('Samanta-asks component created.') }
  
  opts: any = {
    strings: [],
    typeSpeed: 10,
    backSpeed: 0,
    fadeOut: true,
    onComplete: (self) => {
      this.onTypeEnded.emit();
    }
  }

  sentence: any = null;
  
  ngOnInit() {
    this.data.subscribe((res) => {
      this.sentence && this.sentence.destroy();
      this.opts.strings = res;
      this.sentence = new Typed('span', this.opts);
    });   
  }

}