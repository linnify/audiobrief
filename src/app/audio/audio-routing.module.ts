import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioListComponent} from './components/audio-list/audio-list.component';
import {NewsFeedComponent} from './components/news-feed/news-feed.component';

const routes: Routes = [
  {
    path: '',
    component: NewsFeedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioRoutingModule { }
