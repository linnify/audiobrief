import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NewsEntry} from '../types/news-entry';
import {ApiService} from '../../shared/services/api.service';
import {map} from 'rxjs/operators';
import {StartReason} from '../types/start-reason';
import {StartPlayStat} from '../types/start-play-stat';
import {EndReason} from '../types/end-reason';
import {EndPlayStat} from '../types/end-play-stat';
import {UuidService} from '../../shared/services/uuid.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private firstPlayed: boolean = true;
  private _currentNews: BehaviorSubject<NewsEntry> = new BehaviorSubject(null);
  private _playing: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private currentNewsUUID: string;

  currentNews: Observable<NewsEntry> = this._currentNews.asObservable();
  playing: Observable<boolean> = this._playing.asObservable();

  constructor(
    private apiService: ApiService,
    private uuiService: UuidService
  ) { }

  getNewsEntries(): Observable<NewsEntry[]> {

    return this.apiService.get('mynews')
      .pipe(
        map((receivedNews: any[]) => {
          const newsEntries: NewsEntry[] =
            receivedNews.map((news: NewsEntry) => ({
                ...news,
                date_published: new Date(news.date_published),
                uploaded_at: new Date(news.uploaded_at),
                start_at: new Date(news.start_at)
              }
            ));
          this.currentNewsUUID = this.uuiService.generate();
          this._currentNews.next(newsEntries[0]);
          return newsEntries;
        })
      );
  }


  onPlay(newsEntry: NewsEntry) {
    if (newsEntry !== this._currentNews.value) {
      this._currentNews.next(newsEntry);
    }

    if (this.firstPlayed) {
      this.firstPlayed = false;
      this.sendStartPlayStats(newsEntry, StartReason.FIRST_PLAY);
    } else {
      this.sendStartPlayStats(newsEntry, StartReason.RESUMED);
    }

    this._playing.next(true);
  }

  onPause(newsEntry: NewsEntry) {
    this._playing.next(false);
    this.sendEndPlayStats(newsEntry, EndReason.PAUSED);
  }

  onChange(newsEntry: NewsEntry) {
    this.sendEndPlayStats(this._currentNews.value, EndReason.SKIPPED);
    this.currentNewsUUID = this.uuiService.generate();
    this._currentNews.next(newsEntry);
    this._playing.next(true);
  }


  sendStartPlayStats(newsEntry: NewsEntry, startReason: StartReason) {
    const startPlayStat: StartPlayStat = {
      news_id: newsEntry.id,
      play_id: this.currentNewsUUID,
      start_play_time: new Date().toISOString(),
      start_reason: startReason
    };

    console.log(startPlayStat);
  }

  sendEndPlayStats(newsEntry: NewsEntry, endReason: EndReason) {
    const endPlayStat: EndPlayStat = {
      news_id: newsEntry.id,
      play_id: this.currentNewsUUID,
      end_play_time: new Date().toISOString(),
      end_reason: endReason
    };

    console.log(endPlayStat);
  }


}
