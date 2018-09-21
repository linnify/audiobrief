import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicsPageComponent } from './topics/containers/topics-page/topics-page.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {environment} from '../environments/environment';
import { reducers, effects, CustomSerializer } from './store';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production === false ? StoreDevtoolsModule.instrument() : [],

  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
