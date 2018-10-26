import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './containers/top-bar/top-bar.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {CoreRoutingModule} from './core-routing.module';
import {TopicsPageComponent} from '../topics/containers/topics-page/topics-page.component';
import {TopicsModule} from '../topics/topics.module';
import { NewsFeedbackComponent } from './containers/news-feedback/news-feedback.component';
import { NewsFeedbackDisplayComponent } from './components/news-feedback-display/news-feedback-display.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    TopicsModule
  ],
  declarations: [TopBarComponent, AudioPlayerComponent, NewsFeedbackComponent, NewsFeedbackDisplayComponent, PrivacyPolicyComponent],
  entryComponents: [TopicsPageComponent, NewsFeedbackComponent, PrivacyPolicyComponent],
})
export class CoreModule { }
