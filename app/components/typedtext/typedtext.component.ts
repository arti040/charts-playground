/* Angular */
import { Component, Input, Output, OnInit, OnDestroy, AfterViewInit, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence, dialogGroup } from '../../constants/dialogs';
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

  @Input() data: sentence; // main data object from /constant/dialogs.ts
  @Input() typedOpts?: typedOpts; // TODO - custom opts for typed.js, if needed
  @Input() modificator: string; // CSS BEM class modificator
  @Input() startTyping?: Observable<boolean>; //typed.js will wait until this variable is true
  @Output() onTypeEnded = new EventEmitter<onTypeEnded>(); // this fires when text typing is finished

  constructor(private el: ElementRef ) { console.log('Typedtext component created.'); }
  
  opts: typedOpts = {
    strings: [],
    typeSpeed: 20,
    backSpeed: 0,
    fadeOut: true
  }

  private start: boolean;
  private sentence: Typed = null;
  private alive: boolean = true;
  
  ngOnInit() {
    if(!this.data) { return console.log('Typedtext Component: no data provided.') }
    this.startTyping.takeWhile(() => this.alive).subscribe(res => this.start = res);  
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    let typedContainer = this.el.nativeElement.querySelector('span');
    if(this.start) {
      this.sentence = new Typed(typedContainer, this.createTypedOpts());
    }       
  }

  createTypedOpts() {
    let opts = JSON.parse(JSON.stringify(this.opts));
    opts.strings = this.data.text;
    opts.onComplete = (self) => { this.onTypeEnded.emit({ action: this.data.action }); }     
    return opts;
  }

}