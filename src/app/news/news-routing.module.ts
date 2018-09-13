import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsFeedComponent} from './containers/news-feed/news-feed.component';
import {NewsPageComponent} from './containers/news-page/news-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewsFeedComponent
  },
  {
    path: ':newsId',
    component: NewsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
