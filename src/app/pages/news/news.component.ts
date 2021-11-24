import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    
    this.data = sessionStorage.getItem("news");

    console.log(this.data)
    const newsSession = this.data != null ? JSON.parse(this.data) : '' ;
    this.news = newsSession

    //Solo se solicitan los datos a la API si esta vacio el sessionStorage
    // if (newsSession == '') {
    //   this.newsList();
    // }else {
    // }
  }

  newsList(): void {
    this.newsService.getNewsData().subscribe(data => {
      this.news = data
      sessionStorage.setItem('news', JSON.stringify(this.news))
    })
  }

  ngOnDestroy(): void {}

}
