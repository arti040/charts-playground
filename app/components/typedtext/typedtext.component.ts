/* Angular */
import { Component, Input, Output, OnInit, OnDestroy,EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Typed from 'typed.js';  

/* Models & Constants */
import { sentence, dialogGroup, typedOpts, onTypeEnded } from '../../constants/dialogs';

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
  
  private opts: typedOpts = {
    strings: [],
    typeSpeed: 20,
    backSpeed: 0,
    fadeOut: true,
    showCursor: false
  }

  private sentence: Typed = null;
  private alive: boolean = true;
  
  ngOnInit() {
    if(!this.data) { return console.log('Typedtext Component: no data provided.') }
    this.startTyping
    .takeWhile(() => this.alive)
    .subscribe((res) => { 
      this.runTyped(res);
    });  
  }

  ngOnDestroy(): void { this.alive = false; }

  private runTyped(autorun): void {
    if(autorun) {
      let typedContainer = this.el.nativeElement.querySelector('span');      
      this.sentence = new Typed(typedContainer, this.createTypedOpts());
    }  
  }

  private createTypedOpts(): typedOpts {
    let opts = JSON.parse(JSON.stringify(this.opts));
    opts.strings = this.data.text;
    opts.onComplete = (self) => { this.onTypeEnded.emit({ action: this.data.action }); }     
    return opts;
  }

}