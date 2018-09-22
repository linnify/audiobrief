import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './containers/top-bar/top-bar.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {CoreRoutingModule} from './core-routing.module';
import {TopicsPageComponent} from '../topics/containers/topics-page/topics-page.component';
import {TopicsModule} from '../topics/topics.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    TopicsModule
  ],
  declarations: [TopBarComponent, AudioPlayerComponent],
  entryComponents: [TopicsPageComponent],
})
export class CoreModule { }
