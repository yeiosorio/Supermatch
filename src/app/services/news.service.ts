import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CONFIGS } from '../configs/app.config';
import { InewsResponse } from 'src/app/models/interfaces';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  headers: any;
  data: null | string = null
  news: Array<InewsResponse> = [];
  newsFilter: Array<InewsResponse> = [];
  
  constructor(public http: HttpClient) {
  //   this.headers = new HttpHeaders({
  //     'Cookie': 'XSRF-TOKEN=5VsfceGks0Y6zYDf1MYLwxswovfU1q6PIYT12qC0grA%3D; _labanca_session=6d90ffb0df3d577637ccbe7b438ebfbd'
  //  });
  }

  getNewsData(): Observable<any> {
   
    return this.http.get<any>(CONFIGS.endpointnews)
    .pipe(
      map(data => data.noticias),
      catchError(this.handleError<any>('Noticias'))
    )
  }

  querySessionNews(): Observable<InewsResponse[]> {
    this.data = sessionStorage.getItem("news");
    return of(this.news = this.data != null ? JSON.parse(this.data) : '');
  }

  deleteService(news: InewsResponse[], idNews: number): Observable<InewsResponse[]> {
    this.newsFilter = news.filter(item => idNews != item.id);
    sessionStorage.setItem('news', JSON.stringify(this.newsFilter));
    return of(this.newsFilter);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`failed: ${error.message}`);
      return of(result as T);
    };
  }

}
