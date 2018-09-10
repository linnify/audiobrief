import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NewsEntry} from '../types/news-entry';
import {ApiService} from '../../shared/services/api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _currentNews: BehaviorSubject<NewsEntry> = new BehaviorSubject(null);
  private _playing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  currentNews: Observable<NewsEntry> = this._currentNews.asObservable();
  playing: Observable<boolean> = this._playing.asObservable();

  constructor(private apiService: ApiService) { }

  getNewsEntries(): Observable<NewsEntry[]> {

    return this.apiService.get('mynews')
      .pipe(
        map((receivedNews: any[]) => {
          const newsEntries: NewsEntry[] =
            receivedNews.map(news => ({
              id: news.id,
              tags: news.tags,
              source: news.source,
              url: news.url,
              title: news.title,
              textContent: news.text_content,
              editedSummary: news.edited_summary,
              datePublished: new Date(news.date_published),
              uploadedAt: new Date(news.uploded_at),
              startAt: new Date(news.start_at),
              audioSource: news.audio_source,
              summarySource: news.summary_source,
              numberOfViews: news.number_of_views,
              numberOfShares: news.number_of_source,
              numberOfListens: news.number_of_listens,
              credibility: news.credibility,
              topic: news.topic,
              mp3File: news.mp3_file,
              uploader: news.uploder
            }));
          this._currentNews.next(newsEntries[0]);
          return newsEntries;
        })
      );
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
