import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioListComponent } from './components/audio-list/audio-list.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';

@NgModule({
  imports: [
    CommonModule,
    AudioRoutingModule
  ],
  declarations: [AudioListComponent, NewsFeedComponent]
})
export class AudioModule { }
