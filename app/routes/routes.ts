import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../pages/home.page';
import { Config } from '../app.config';

let config = new Config();

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent, data: { title: config.appName } }	
]
