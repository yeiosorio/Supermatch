import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InewsResponse } from 'src/app/models/interfaces';
import { NewsService } from '../../services/news.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  idNews: number = 0
  newsDetail: any;
  querySubscription: Subscription = new Subscription;
  deleteSubscription: Subscription = new Subscription;
  
  constructor(route: ActivatedRoute, private router: Router, private newsService: NewsService) {
    route.params.subscribe(params => {
      console.log(params.id)
      this.idNews = params.id
    });

  }

  ngOnInit(): void {
    this.querySubscription = this.newsService.querySessionNews().subscribe(news => {
      this.newsDetail = news.find(item => this.idNews == item.id);
      console.log(this.newsDetail);
    })

  }

  deleteNews(): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.querySubscription = this.newsService.querySessionNews().subscribe(news => {
          this.deleteSubscription = this.newsService.deleteService(news, this.idNews).subscribe(res => {
            Swal.fire(
              'Deleted!',
              'The News has been deleted.',
              'success'
            );
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

}
