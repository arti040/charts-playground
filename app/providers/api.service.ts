// === Api HTTP Service
// @name ApiService
// @desc Implements low-level HTTP related actions for API.
// @params none
// @returns none

import { Injectable } from '@angular/core';
import { Config } from '../app.config';
import { 
  Http,
  Headers, 
  RequestOptions, 
  RequestOptionsArgs,
  Response,
  RequestMethod,
  Request
} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor (private config: Config, private http: Http) {}
  
  public get(endpoint: string, body?: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Get, this.getHost() + endpoint, null, options);
  }
  public post(endpoint: string, body: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Post, this.getHost() + endpoint, body, options);
  }
  public put(endpoint: string, body: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Put, this.getHost() + endpoint, body, options);
  }
  public delete(endpoint: string, body?: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Delete, this.getHost() + endpoint, null, options);
  }
  public update(endpoint: string, body?: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Patch, this.getHost() + endpoint, body, options);
  }
  public head(endpoint: string, body?: string, options?: RequestOptionsArgs) {
    return this.request(RequestMethod.Head, this.getHost() + endpoint, null, options);
  }

  private getHost() { return this.config.apiUrl; }
  private request(
      method: RequestMethod, 
      url: string, 
      body?: string, 
      options?: RequestOptionsArgs
    ): Observable<Response> {
    
    let opts = {
      method: method,
      url: url,
      body: body
    }    

    let requestOptions = new RequestOptions(Object.assign(opts, options));

    return this.http.request(new Request(requestOptions))
    .catch((err: Response, caught) => {
      return Observable.throw(err);
    })

  }
}