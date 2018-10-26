import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../../news/types/news-entry';

@Component({
  selector: 'audio-player',
  template: `
    <div class="audio-player" *ngIf="currentNews">
      <div class="audio-player__text" (click)="onView()">
        <div class="mat-body-1 audio-player__text-title" [matTooltip]="currentNews.title">
          {{currentNews.title}}
        </div>
        <div class="mat-caption audio-player__text-topics">
          {{currentNews.topic.label}}
        </div>
      </div>
      <div class="audio-player__buttons">
        <button  type="button" *ngIf="authenticated" mat-icon-button 
                 (click)="onPlayPrevious()" [disabled]="currentNewsIndex === 0">
          <mat-icon class="medium-icon">skip_previous</mat-icon>
        </button>
        <button type="button" mat-icon-button class="main-button" *ngIf="!playing" (click)="onPlay()">
          <mat-icon class="big-icon">play_circle_outline</mat-icon>
        </button>
        <button type="button" mat-icon-button class="main-button" *ngIf="playing" (click)="onPause()">
          <mat-icon class="big-icon" style="color: white">pause_circle_outline</mat-icon>
        </button>
        <button  type="button" *ngIf="authenticated" mat-icon-button 
                 (click)="onPlayNext()" [disabled]="currentNewsIndex === newsEntries.length - 1">
          <mat-icon class="medium-icon">skip_next</mat-icon>
        </button>
        <mat-progress-bar class="progress-bar-container" mode="determinate" [value]="progress"></mat-progress-bar>
        <div class="audio-player__duration">
          <span *ngIf="audio.duration">{{audio.duration | minuteSeconds}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnChanges, AfterViewInit {
  progress: number = 0;
  currentNewsIndex: number;
  // audio: HTMLAudioElement = new Audio();
  playingTransaction: boolean = false;

  @Input() newsEntries: NewsEntry[];
  @Input() currentNews: NewsEntry;
  @Input() playing: boolean;
  @Input() audio: HTMLAudioElement;
  @Input() authenticated: boolean;
  @Output() view: EventEmitter<NewsEntry> = new EventEmitter();
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() pause: EventEmitter<any> = new EventEmitter();
  @Output() playNext: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.currentNewsIndex = 0;
  }

  ngOnChanges() {
    if (this.currentNews && this.newsEntries && this.currentNews.mp3_file !== this.audio.src) {
      this.currentNewsIndex = this.newsEntries.findIndex((newsEntry: NewsEntry) => newsEntry.id === this.currentNews.id);
      this.audio.src = this.currentNews.mp3_file;
    }

    if (!this.playing) {
      this.audio.pause();
    } else {
      this.audio.muted = false;
      this.audio.play();
    }
  }

  ngAfterViewInit() {
    this.audio.addEventListener('timeupdate', () => {
      this.progress = this.audio.currentTime * 100 / this.audio.duration;
    });

    this.audio.addEventListener('ended', () => {
      this.playTransactionOrNext();
    });
  }

  onPlay() {
    this.play.emit(this.currentNews);
    if (this.currentNews.mp3_file !== this.audio.src) {
      this.audio.src = this.currentNews.mp3_file;
    }
    this.audio.play();
  }

  onPause() {
    this.pause.emit(this.currentNews);
    this.audio.pause();
  }

  onPlayNext() {
    // last song in playlist
    if (this.currentNewsIndex === this.newsEntries.length - 1) {
      return;
    }

    this.currentNewsIndex++;
    this.play.emit(this.newsEntries[this.currentNewsIndex]);
  }

  onPlayPrevious() {
    // first song in playlist
    if (this.currentNewsIndex <= 0) {
      return;
    }

    this.currentNewsIndex--;
    this.play.emit(this.newsEntries[this.currentNewsIndex]);
  }

  onView() {
    this.view.emit(this.currentNews);
  }

  private playTransactionOrNext() {
    if (this.playingTransaction === false && this.currentNewsIndex !== this.newsEntries.length - 1) {
      this.audio.src = 'assets/transaction.mp3';
      this.playingTransaction = true;
      this.audio.play();
    } else {
      this.playingTransaction = false;
      this.playNext.emit(this.currentNews);
    }
  }
}
