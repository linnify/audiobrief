import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../types/news-entry';
import {months} from '../../../shared/constants';
import { DOCUMENT } from '@angular/common';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'news-list-item',
  template: `
    <div class="news-item" style="display: flex; align-items: center" [ngClass]="{'playing' : playing}">
      <div class="image-container">
        <img *ngIf="newsEntry.source_new" src="{{newsEntry.source_new.logo_file}}" class="logo">
        <img *ngIf="!newsEntry.source_new" src="assets/default_logo.png" class="logo">
      </div>
      <div style="width: 100%" >
        <div *ngIf="newsEntry" class="news-item__container" (click)="onView($event)">
          <div class="news-item__details">
            <div class="mat-title">{{newsEntry.title}}</div>
            <div class="mat-subheading-2 topic" [ngStyle]="{'background-color': newsEntry.topic.color}">{{newsEntry.topic.label}}</div>
            <div class="mat-subheading-1">{{newsEntry.source_new.name}} - {{getFormattedDate(newsEntry.date_published)}}</div>
          </div>
          <div style="display: flex">
            <button mat-icon-button class="main-button">
              <mat-icon class="big-icon" *ngIf="!playing" (click)="onPlay($event);">play_circle_filled_white</mat-icon>
              <mat-icon class="big-icon" *ngIf="playing" (click)="onPause($event);">pause_circle_filled</mat-icon>
            </button>
            <button mat-icon-button class="main-button" [matMenuTriggerFor]="shareMenu" 
                    (click)="$event.stopPropagation()">
              <mat-icon class="big-icon">share</mat-icon>
            </button>
            <mat-menu #shareMenu="matMenu">

              <button mat-menu-item (click)="onOpenUrl('https://www.facebook.com/sharer/sharer.php?u=')">
                <mat-icon svgIcon="facebook"></mat-icon>
                <span>Facebook</span>
              </button>
              <button mat-menu-item (click)="onOpenUrl('https://twitter.com/home?status=')">
                <mat-icon svgIcon="twitter"></mat-icon>
                <span>Twitter</span>
              </button>
              <button mat-menu-item (click)="onOpenUrl('https://www.linkedin.com/shareArticle?mini=true&url=')">
                <mat-icon svgIcon="linkedin"></mat-icon>
                <span>Linkedin</span>
              </button>
              <button mat-menu-item [text-copy]="newsEntry.url">
                <mat-icon svgIcon="copy"></mat-icon>
                <span>Copy link</span>
              </button>
            </mat-menu>
          </div>
        </div>
        <mat-divider></mat-divider>
      </div>
    </div>
  `,
  styleUrls: ['./news-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListItemComponent implements OnInit {
  @Input() playing: boolean;
  @Input() newsEntry: NewsEntry;
  @Input() audio: HTMLAudioElement;

  @Output() play: EventEmitter<any> = new EventEmitter<any>();
  @Output() pause: EventEmitter<any> = new EventEmitter<any>();
  @Output() view: EventEmitter<any> = new EventEmitter<any>();
  @Output() openUrl: EventEmitter<{url: string, config: any}> = new EventEmitter<{url: string, config: any}>();
  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  getFormattedDate(date: Date) {
    return `${months[date.getMonth()]}
     ${date.getDate()}, ${date.getFullYear()}`;
  }

  onPlay(event) {
    const isIphoneOrSafari: boolean = !!navigator.userAgent.match(/iphone|safari/ig) || false;

    if (isIphoneOrSafari) {
      this.audio.muted = true;
      this.audio.play();
    }

    event.stopPropagation();
    this.play.emit(this.newsEntry);
  }

  onPause(event) {
    event.stopPropagation();
    this.pause.emit(this.newsEntry);
  }

  onView() {
    this.view.emit(this.newsEntry);
    this.play.emit(this.newsEntry);
  }

  onOpenUrl(sharerUrl: string): void {
    const url: string = `${sharerUrl}${environment.host}app/news/${this.newsEntry.id}`;
    const config: any = {
      title: this.newsEntry.title,
      description: 'Small description',
      url: `${environment.host}app/news/${this.newsEntry.id}`
    };
    this.openUrl.emit({url, config});
  }
}
