import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NewsEntry} from '../../../news/types/news-entry';

@Component({
  selector: 'audio-player',
  template: `
    <div class="audio-player" *ngIf="newsEntries && newsEntries.length !== 0">
      <div class="audio-player__text">
        <div class="mat-body-1 audio-player__text-title">
          {{currentNews.title}}
        </div>
        <div class="mat-caption audio-player__text-topics">
          {{currentNews.topic}}
        </div>
      </div>
      <div class="audio-player__buttons">
        <button mat-icon-button (click)="playPrevious()" [disabled]="currentNewsIndex === 0">
          <mat-icon class="medium-icon">skip_previous</mat-icon>
        </button>
        <button mat-icon-button class="main-button" *ngIf="!playing" (click)="onPlay()">
          <mat-icon class="big-icon">play_circle_outline</mat-icon>
        </button>
        <button mat-icon-button class="main-button" *ngIf="playing" (click)="onPause()">
          <mat-icon class="big-icon" style="color: white">pause_circle_outline</mat-icon>
        </button>
        <button mat-icon-button (click)="playNext()" [disabled]="currentNewsIndex === newsEntries.length - 1">
          <mat-icon class="medium-icon">skip_next</mat-icon>
        </button>
        <mat-progress-bar class="progress-bar-container" mode="determinate" [value]="progress"></mat-progress-bar>
      </div>
    </div>
  `,
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnChanges, AfterViewInit {
  progress: number = 0;
  currentNewsIndex: number;
  private audio: HTMLAudioElement = new Audio();

  @Input() newsEntries: NewsEntry[];
  @Input() currentNews: NewsEntry;
  @Input() playing: boolean;
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<NewsEntry> = new EventEmitter();
  @Output() pause: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.currentNewsIndex = 0;
  }

  ngOnChanges() {


    this.audio.autoplay = this.playing;
    if (this.playing) {
      if (this.currentNews.mp3_file !== this.audio.src) {
        this.currentNewsIndex = this.newsEntries.findIndex((newsEntry: NewsEntry) => newsEntry.id === this.currentNews.id);
        this.audio.src = this.currentNews.mp3_file;
      }
    } else {
      this.onPause();
    }
  }

  ngAfterViewInit() {
    this.audio.addEventListener('timeupdate', () => {
      this.progress = this.audio.currentTime * 100 / this.audio.duration;
    });

    this.audio.addEventListener('ended', () => {
      if (this.currentNewsIndex === this.newsEntries.length - 1) {
      } else {
        this.playNext();
      }
    });

    // this.audio.addEventListener('play', () => {
    //   console.log('play');
    //   this.play.emit(this.currentNews);
    // });

    this.audio.addEventListener('pause', () => {
      this.pause.emit(this.currentNews);
    });
  }

  onPlay() {
    console.log('play');
    this.play.emit(this.currentNews);
    this.audio.play();
  }

  onPause() {
    this.audio.pause();
  }

  playNext() {
    // last song in playlist
    if (this.currentNewsIndex === this.newsEntries.length - 1) {
      return;
    }

    this.currentNewsIndex++;
    this.change.emit(this.newsEntries[this.currentNewsIndex]);
  }

  playPrevious() {
    // first song in playlist
    if (this.currentNewsIndex <= 0) {
      return;
    }

    this.currentNewsIndex--;
    this.change.emit(this.newsEntries[this.currentNewsIndex]);
    //
    // this.currentNews = this.newsEntries[this.currentNewsIndex];
    // this.audio.src = this.newsEntries[this.currentNewsIndex].mp3File;
  }
}
