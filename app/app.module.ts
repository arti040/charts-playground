import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './routes/routes';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home.page';
import { DummyComponent } from './components/dummy.component';
import { ChartComponent } from './components/chart/chart.component';

import { ApiService } from './providers//api.service';
import { Config } from './app.config';
import { ChartModule } from 'angular2-highcharts';


const routes: Routes = appRoutes;

@NgModule({
  declarations: [ AppComponent, HomePageComponent, DummyComponent, ChartComponent ],
  entryComponents: [ DummyComponent ],
  imports: [ 
    BrowserModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts'))
  ],
  bootstrap: [ AppComponent ],
  providers: [ ApiService, Config ]
})
export class AppModule { }