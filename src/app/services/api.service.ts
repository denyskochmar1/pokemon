import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    RequestOptionsArgs,
    ConnectionBackend,
    RequestOptions,
    Request,
    Response,
    XHRBackend,
    BrowserXhr,
    BaseRequestOptions,
    BaseResponseOptions,
    ResponseOptions, CookieXSRFStrategy, XSRFStrategy
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

const BASE_URL = `http://pokeapi.co/api/v2`;
const SOCKET_URL = ``;

@Injectable()
export class ApiHttp extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions) {
    super( backend, defaultOptions );
  }

  public send(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.request( url, options );
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if( typeof url === 'string' ) {
      // options = this.prepareOptions(options);
      return super.request( `${BASE_URL }/${url}`, options );
    } else if( url instanceof Request ) {
      return super.request( url );
    } else {
      throw new Error( 'First argument must be a url string or Request instance.' );
    }
  }

  /**
   * Performs a request with `getUnit` http method.
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get( `${BASE_URL }/${url}`)
        .catch( (error) => this.handleError( error ) );
  }

  /**
   * Performs a modified request with `getUnit` http method.
   */
  public getPagination(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get( `${url}`, this.setHeaders() )
        .catch( (error) => this.handleError( error ) );
  }

  /**
   * Performs a request with `post` http method.
   */
  public post(url: string, body, options?: RequestOptionsArgs): Observable<Response> {
    return super.post( `${BASE_URL }/${url}`, body, this.setHeaders() )
        .catch( (error) => this.handleError( error ) );
  }

  /**
   * Performs a request with `put` http method.
   */
  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put( `${BASE_URL }/${url}`, body, this.setHeaders() )
        .catch( (error) => this.handleError( error ) );
  }

  /**
   * Performs a request with `delete` http method.
   */
  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete( `${BASE_URL }/${url}`, this.setHeaders() )
        .catch( (error) => this.handleError( error ) );
  }

  /**
   * Performs a request with `patch` http method.
   */
  public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.patch( `${BASE_URL }/${url}`, body, options );
  }

  /**
   * Performs a request with `head` http method.
   */
  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // options = this.prepareOptions(options);
    return super.head( `${BASE_URL }/${url}`, options );
  }

  //////////////////////////////////////////////////////////////////

  private setHeaders() {
    let options: RequestOptionsArgs = {
      headers : new Headers( {
        Authorization : `Bearer ${localStorage.getItem( 'token' )}`
      } )
    };
    return options;
  }

  private handleError(error) {
    return Observable.throw( error );
  }

}

export function httpFactory(xhrBackend, requestOptions) {
  return new ApiHttp( xhrBackend, requestOptions );
}

export function xsrfFactory() {
  return new CookieXSRFStrategy( 'csrftoken', 'X-CSRFToken' );
}

export const API_HTTP_PROVIDERS = [
  {
    provide : ApiHttp,
    useFactory : httpFactory,
    deps : [XHRBackend, RequestOptions]
  },
  BrowserXhr,
  { provide : RequestOptions, useClass : BaseRequestOptions },
  { provide : ResponseOptions, useClass : BaseResponseOptions },
  { provide : XSRFStrategy, useFactory : xsrfFactory },
  XHRBackend
];
