import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopicsPageComponent} from './containers/topics-page/topics-page.component';
import {StoreModule} from '@ngrx/store';
import {TopicsEffects, reducer as topicsReducer} from '../topics/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import { TopicsPageDisplayComponent } from './components/topics-page-display/topics-page-display.component';

@NgModule({


  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('topics', topicsReducer),
    EffectsModule.forFeature([TopicsEffects])
  ],
  declarations: [TopicsPageComponent, TopicsPageDisplayComponent]
})
export class TopicsModule { }
