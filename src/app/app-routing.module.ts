import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';
import {UserExistsGuard} from './core/guards/user-exists.guard';
import {TopBarComponent} from './core/containers/top-bar/top-bar.component';
import {NewsGuard} from './news/guards/news.guard';
import {TopicsGuard} from './topics/guards/topics.guard';
import {UserTopicsGuard} from './topics/guards/user-topics.guard';
import {PrivacyPolicyComponent} from './core/components/privacy-policy/privacy-policy.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    pathMatch: 'full',
    canActivate: [UserExistsGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'app',
    component: TopBarComponent,
    children: [
      {
        path: 'news',
        loadChildren: './news/news.module#NewsModule'
      },
    ]
  },
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: '**', component:  NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
