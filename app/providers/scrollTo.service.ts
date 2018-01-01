// === ScrollTo Service
// @name ScrollToSvc
// @desc 
import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
 
@Injectable()
export class ScrollToSvc {
 
  constructor(private _scrollToService: ScrollToService) { }
 
  public triggerScrollTo(el) {
    
    const config: ScrollToConfigOptions = {
      target: el
    };
 
    this._scrollToService.scrollTo(config);
  }
}