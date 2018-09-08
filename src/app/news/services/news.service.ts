import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NewsEntry} from '../types/news-entry';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _currentNews: BehaviorSubject<NewsEntry> = new BehaviorSubject(null);
  private _playing: BehaviorSubject<boolean> = new BehaviorSubject(false);


  currentNews: Observable<NewsEntry> = this._currentNews.asObservable();
  playing: Observable<boolean> = this._playing.asObservable();

  constructor() { }


  getNewsEntries() {
    const newsEntries: NewsEntry[] = [
      {
        id: 10,
        tags: [
          'ai',
          'machine learning'
        ],
        source: 'Coindesk',
        url: 'https://www.coindesk.com/zcash-leaves-crypto-market-behind-with-50-percent-weekly-spike/',
        title: 'Zcash Leaves Crypto Market Behind with 50 Percent Weekly Spike',
        textContent: '<entire news content goes here>',
        editedSummary: '<our news summary>',
        datePublished: new Date('2018-05-20'),
        uploadedAt: new Date('2018-05-20T00:00:00Z'),
        startAt: new Date('2018-05-28T01:45:11.118590Z'),
        audioSource: 'own recording (but usually empty)',
        summarySource: 'own writing (but usually empty)',
        numberOfViews: 0,
        numberOfShares: 0,
        numberOfListens: 0,
        credibility: 100,
        topic: 'crypto',
        mp3File: 'http://ec2-54-72-21-202.eu-west-1.compute.amazonaws.com/mp3s/speech_20180520172241514.mp3',
        uploader: 1
      },
      {
        id: 10,
        tags: [
          'ai',
          'machine learning'
        ],
        source: 'Coindesk',
        url: 'https://www.coindesk.com/zcash-leaves-crypto-market-behind-with-50-percent-weekly-spike/',
        title: 'ZZZZcash Leaves Crypto Market Behind with 50 Percent Weekly Spike',
        textContent: '<entire news content goes here>',
        editedSummary: '<our news summary>',
        datePublished: new Date('2018-05-20'),
        uploadedAt: new Date('2018-05-20T00:00:00Z'),
        startAt: new Date('2018-05-28T01:45:11.118590Z'),
        audioSource: 'own recording (but usually empty)',
        summarySource: 'own writing (but usually empty)',
        numberOfViews: 0,
        numberOfShares: 0,
        numberOfListens: 0,
        credibility: 100,
        topic: 'economics',
        mp3File: 'http://localhost:4200/assets/test.mp3',
        uploader: 1
      }
    ];
    this._currentNews.next(newsEntries[0]);
    return newsEntries;
  }

  onPlay(newsEntry: NewsEntry) {
    this._currentNews.next(newsEntry);
    this._playing.next(true);
  }

  onPause(newsEntry: NewsEntry) {
    this._playing.next(false);
  }

  onChange(newsEntry: NewsEntry) {
    this._currentNews.next(newsEntry);
    this._playing.next(true);
  }
}
