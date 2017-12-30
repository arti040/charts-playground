// === App Config File
// @desc This is main config file

/* Angular */
import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  //apiUrl = 'http://137.185.232.100';
  apiUrl = 'http://localhost:8080';
  appName = 'Samanta 2.0';
  table = {
    column: {
      width: {
        min: 10,
        default: 50
      }
    },
    icon: {
      size: {
        small: '12px'
      },
      color: {}
    }
  }
}
