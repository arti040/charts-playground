import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// === Vendor libs
import './vendors';

// === App Styles
import './atomic.sass';

platformBrowserDynamic().bootstrapModule(AppModule);
