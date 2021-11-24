import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InewsResponse } from 'src/app/models/interfaces';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  idNews: number = 0
  data: null | string = null
  news: Array<InewsResponse> = [];
  newsDetail: InewsResponse | undefined;
  
  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => {
      console.log(params.id)
      this.idNews = params.id
    });
  }

  ngOnInit(): void {

    this.data = sessionStorage.getItem("news");
    this.news = this.data != null ? JSON.parse(this.data) : '' ;
    this.newsDetail = this.news.find(item => this.idNews == item.id)
    console.log(this.newsDetail)

  }

}
