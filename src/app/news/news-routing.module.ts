import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsFeedComponent} from './containers/news-feed/news-feed.component';
import {NewsPageComponent} from './containers/news-page/news-page.component';
import {TopicsGuard} from '../topics/guards/topics.guard';
import {UserTopicsGuard} from '../topics/guards/user-topics.guard';
import {NewsGuard} from './guards/news.guard';
import {AuthenticatedGuard} from '../core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
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
