
/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

/* Modules */
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home.page';
import { ChartComponent } from './components/chart/chart.component';
import { SelectComponent } from './components/select/select.component';
import { TypedtextComponent } from './components/typedtext/typedtext.component';
import { DatatableComponent } from './components/table/table.component';
import { MainFiltersComponent } from './components/main-filters/main-filters.component';

/* Services */
import { Config } from './app.config';
import { appRoutes } from './routes/routes';
import { ApiService } from './providers/api.service';
import { RDataSvc } from './providers/rdata.service';
import { DialogSvc } from './providers/dialog.service';
import { SelectsSvc } from './providers/selects.service';
import { ScrollToSvc } from './providers/scrollTo.service';

/* Constants & Models */

/* Vendors */
import { ChartModule } from 'angular2-highcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

const routes: Routes = appRoutes;

@NgModule({
  declarations: [ 
    AppComponent, 
    ChartComponent, 
    SelectComponent,
    HomePageComponent,  
    TypedtextComponent,
    DatatableComponent,
    MainFiltersComponent
  ],
  entryComponents: [ HomePageComponent ],
  imports: [
    HttpModule,     
    BrowserModule, 
    //HttpClientModule,
    NgxDatatableModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),    
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts'), require('highcharts-more'), require('highcharts-annotations'))
  ],
  bootstrap: [ AppComponent ],
  providers: [ ApiService, RDataSvc, Config, DialogSvc, SelectsSvc, Title, ScrollToSvc ]
})
export class AppModule { }