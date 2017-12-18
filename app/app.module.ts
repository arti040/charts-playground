
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
import { ChartComponent } from './components/chart/chart.component';
import { TypedtextComponent } from './components/typedtext/typedtext.component';
//import { UserComponent } from './components/user/user.component';

/* Services */
import { DialogSvc } from './providers/dialog.service';
import { ApiService } from './providers/api.service';
import { RDataSvc } from './providers/rdata.service';
import { appRoutes } from './routes/routes';
import { Config } from './app.config';

/* Constants & Models */

/* Vendors */
import { ChartModule } from 'angular2-highcharts';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { Ng4DropdownModule } from 'ng4-material-dropdown';

const routes: Routes = appRoutes;

@NgModule({
  declarations: [ 
    AppComponent, 
    HomePageComponent, 
    ChartComponent, 
    TypedtextComponent,
    //UserComponent 
  ],
  entryComponents: [ HomePageComponent ],
  imports: [
    HttpModule,     
    BrowserModule, 
    HttpClientModule,
    Ng4DropdownModule,
    RouterModule.forRoot(routes),
    //MatButtonModule, MatCheckboxModule,
    ChartModule.forRoot(require('highcharts'), require('highcharts-more'), require('highcharts-annotations'))
  ],
  bootstrap: [ AppComponent ],
  providers: [ ApiService, RDataSvc, Config, DialogSvc ]
})
export class AppModule { }