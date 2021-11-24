import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONFIGS } from '../configs/app.config';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  headers: any;
  
  constructor(public http: HttpClient) {
  }

  getNewsData(): Observable<any> {
   
    return this.http.get<any>(CONFIGS.endpointnews)
    .pipe(
      map(data => data.noticias),
      catchError(this.handleError<any>('Noticias'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }

}
