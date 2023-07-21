import { Injectable } from '@angular/core';
import { Observable, of, Observer, from, interval, fromEvent, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';

import { topicId } from './topic-id';

// interface aml_response_pred {
//   pred: string[];
// }

// interface aml_response {
//   response: aml_response_pred[];
// }

@Injectable({
  providedIn: 'root'
})
export class AmlEndpointService {
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
  private amlEndpointUrl = 'https://test-ml-endpt.canadacentral.inference.ml.azure.com/score';
  private primary_key = 'kla2zCT3cCfchC5iphMK2JFa5z4C59a4';
  private api_key = this.primary_key;
  private deployment = 'test-ml-deploy-1';
  httpOptions = {
    headers: new HttpHeaders(
        {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${this.api_key}`, 
          'azureml-model-deployment': this.deployment,
          'X-Requested-With': 'XMLHttpRequest'
        }
      )
  };
  
  constructor(
    private http: HttpClient
  ) { }

  getSinglePrediction(query: string): Observable<string> {
    return this.http.post<string>(this.corsProxyUrl+this.amlEndpointUrl, this.makeBodySingleQuery(query), this.httpOptions)
      .pipe(
        // tap(resp => console.log(`Query: ${query} | returned response: ${resp}`)),
        catchError(this.handleError<string>('getSinglePrediction'))
      );
  }

  getBatchPrediction(queries: string[]): Observable<string[][]> {
    return this.http.post<string[][]>(this.corsProxyUrl+this.amlEndpointUrl, JSON.stringify(this.makeBodyBatchQueries(queries)), this.httpOptions)
      .pipe(
        // tap(resp => {
        //   console.log(`Queries: ${queries} | returned response: ${this.stringify_aml_response(resp)}`);
        // }),
        catchError(this.handleError<string[][]>('getBatchPrediction'))
      );
  }

  stringify_aml_response(response: string[][]): string {
    let response_delimited = '';
    for (let preds of response) {
      // console.log(`===> ${pred}`);
      let predStr = preds.join(',');
      response_delimited = response_delimited.concat(`${predStr}\n`);
    }
    return response_delimited; 
  }

  makeBodySingleQuery(query: string) {
    return { 'data': [ query ] }
  }

  makeBodyBatchQueries(queries: string[]) {
    // TODO: create multiple queries data structure
    return { 'data': queries }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(`${operation} failed: ${error}`); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        // this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
