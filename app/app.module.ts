
/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home.page';
import { DummyComponent } from './components/dummy.component';
import { ChartComponent } from './components/chart/chart.component';

/* Services */
import { ApiService } from './providers//api.service';
import { RDataSvc } from './providers/rdata.service';
import { appRoutes } from './routes/routes';
import { Config } from './app.config';

/* Constants & Models */

/* Vendors */
import { ChartModule } from 'angular2-highcharts';


const routes: Routes = appRoutes;

@NgModule({
  declarations: [ AppComponent, HomePageComponent, DummyComponent, ChartComponent ],
  entryComponents: [ DummyComponent ],
  imports: [
    HttpModule,     
    BrowserModule, 
    HttpClientModule, 
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts'), require('highcharts-more'), require('highcharts-annotations'))
  ],
  bootstrap: [ AppComponent ],
  providers: [ ApiService, RDataSvc, Config ]
})
export class AppModule { }