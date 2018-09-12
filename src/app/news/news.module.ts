import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFeedComponent } from './containers/news-feed/news-feed.component';
import {SharedModule} from '../shared/shared.module';
import { AudioPlayerComponent } from '../core/components/audio-player/audio-player.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
  ],
  declarations: [NewsListComponent, NewsFeedComponent, NewsListItemComponent]
})
export class NewsModule { }
