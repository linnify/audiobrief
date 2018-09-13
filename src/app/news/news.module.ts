import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFeedComponent } from './containers/news-feed/news-feed.component';
import {SharedModule} from '../shared/shared.module';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';
import {StoreModule} from '@ngrx/store';
import {NewsEffects, reducer as newsReducer} from './store';
import {EffectsModule} from '@ngrx/effects';
import { NewsPageComponent } from './containers/news-page/news-page.component';
import { NewsPageDisplayComponent } from './components/news-page-display/news-page-display.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    StoreModule.forFeature('news', newsReducer),
    EffectsModule.forFeature([NewsEffects])
  ],
  entryComponents: [NewsPageComponent],
  declarations: [NewsListComponent, NewsFeedComponent, NewsListItemComponent, NewsPageComponent, NewsPageDisplayComponent]
})
export class NewsModule { }
