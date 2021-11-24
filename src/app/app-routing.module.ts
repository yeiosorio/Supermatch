import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  { 
    path: 'newsDetail/:id',
    loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailModule) 
  },
  {
    path: '',
    component: NewsComponent,
  },
  { 
    path: '**', 
    redirectTo: '/' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
