import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import {SharedModule} from '../shared/shared.module';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    AudioRoutingModule,
    SharedModule,
  ],
  declarations: [NewsListComponent, NewsFeedComponent, AudioPlayerComponent, NewsListItemComponent]
})
export class AudioModule { }
