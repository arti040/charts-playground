import { Component } from '@angular/core';
import { Config } from './app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})

export class AppComponent {
  constructor(private config: Config) {}
}