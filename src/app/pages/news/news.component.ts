import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Payload, InewsResponse } from '../../models/interfaces';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy, Payload { 
  news: Array<InewsResponse> = [];
  data: null | string = null
  newsSubscription: Subscription = new Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    
    this.data = sessionStorage.getItem("news");

    console.log(this.data)
    const newsSession = this.data != null ? JSON.parse(this.data) : '' ;
    
    //Solo se hace un apeticion a la API si esta vacio el sessionStorage
    if (newsSession == '') {
      this.newsList();
    }else {
      this.news = newsSession
    }
  }

  newsList(): void {
    this.newsSubscription = this.newsService.getNewsData().subscribe(data => {
      this.news = data
      sessionStorage.setItem('news', JSON.stringify(this.news))
    })
  }

  ngOnDestroy(): void {
    this.newsSubscription.unsubscribe();
  }

}
