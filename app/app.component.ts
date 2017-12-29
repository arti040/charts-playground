import { Component, OnInit } from '@angular/core';
import { Config } from './app.config';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})

export class AppComponent implements OnInit {
  constructor(
    private config: Config,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private _titleSvc: Title) {}

  ngOnInit() {
    this.setPageTitle();
  }

  public setPageTitle() {
    this.router.events
    .filter(e => e instanceof NavigationEnd)
    .map(()=>{
      let routeData = this.activatedRoute.firstChild.snapshot.data;
      return  routeData && routeData['title'] ? routeData['title'] : null;
    })
    .subscribe((title: string) => this._titleSvc.setTitle(title));
  }
}