
/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

/* Modules */
import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home.page';
import { ChartComponent } from './components/chart/chart.component';
import { TypedtextComponent } from './components/typedtext/typedtext.component';
import { SelectComponent } from './components/select/select.component';
//import { UserComponent } from './components/user/user.component';

/* Services */
import { Config } from './app.config';
import { appRoutes } from './routes/routes';
import { ApiService } from './providers/api.service';
import { RDataSvc } from './providers/rdata.service';
import { DialogSvc } from './providers/dialog.service';


/* Constants & Models */

/* Vendors */
import { ChartModule } from 'angular2-highcharts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = appRoutes;

@NgModule({
  declarations: [ 
    AppComponent, 
    ChartComponent, 
    SelectComponent,
    HomePageComponent,  
    TypedtextComponent 
    //UserComponent 
  ],
  entryComponents: [ HomePageComponent ],
  imports: [
    HttpModule,     
    BrowserModule, 
    //HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts'), require('highcharts-more'), require('highcharts-annotations'))
  ],
  bootstrap: [ AppComponent ],
  providers: [ ApiService, RDataSvc, Config, DialogSvc ]
})
export class AppModule { }