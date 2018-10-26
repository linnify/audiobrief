import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material.module';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {ScrollableDirective} from './directives/scrollable.directive';
import { TextCopyDirective } from './directives/copy-url.directive';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { ShareComponent } from './components/share/share.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  declarations: [NotFoundComponent, ScrollableDirective, TextCopyDirective, MinuteSecondsPipe, ShareComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    NotFoundComponent,
    ScrollableDirective,
    TextCopyDirective,
    MinuteSecondsPipe,
    ShareComponent
  ]
})
export class SharedModule { }
