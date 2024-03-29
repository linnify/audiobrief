import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsEntry} from '../types/news-entry';
import {ApiService} from '../../shared/services/api.service';
import {first, map, tap} from 'rxjs/operators';
import {StartReason} from '../types/start-reason';
import {StartPlayStat} from '../types/start-play-stat';
import {EndReason} from '../types/end-reason';
import {EndPlayStat} from '../types/end-play-stat';
import {UuidService} from '../../shared/services/uuid.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private currentNewsUUID: string;

  constructor(
    private apiService: ApiService,
    private uuidService: UuidService
  ) { }

  getNewsEntries(): Observable<NewsEntry[]> {

    return this.apiService.get('mynews/')
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
          return newsEntries;
        })
      );
  }

  getNewsEntry(id: number): Observable<NewsEntry> {
    return this.apiService.get(`newsentries/${id}/`)
      .pipe(
        map((receivedNews: any) => ({
          ...receivedNews,
          date_published: new Date(receivedNews.date_published),
          uploaded_at: new Date(receivedNews.uploaded_at),
          start_at: new Date(receivedNews.start_at)
        }))
      );
  }

  async play(newsEntry: NewsEntry, oldNewsEntry: NewsEntry) {
    let startReason: StartReason = StartReason.FIRST_PLAY;
    const authenticated: boolean = await this.apiService.isAuthenticated();

    if (!authenticated) {
      return;
    }

    if (!this.currentNewsUUID) {
      this.currentNewsUUID = this.uuidService.generate();
    } else if (newsEntry.id !== oldNewsEntry.id) {
      startReason = StartReason.PREV_SKIPPED;
      await this.sendEndPlayStats(newsEntry, EndReason.SKIPPED);
      this.currentNewsUUID = this.uuidService.generate();
    } else {
      startReason = StartReason.RESUMED;
    }

    return this.sendStartPlayStats(newsEntry, startReason);
  }

  async setStatsNextNews(newsEntry: NewsEntry, newsEntries: NewsEntry[]): Promise<void> {
    await this.sendEndPlayStats(newsEntry, EndReason.ENDED);

    this.currentNewsUUID = this.uuidService.generate();

    const newsEntryIndex: number = newsEntries.findIndex((entry: NewsEntry) => entry.id === newsEntry.id);

    if (newsEntryIndex !== newsEntries.length - 1) {
      await this.sendStartPlayStats(newsEntries[newsEntryIndex + 1], StartReason.PREV_ENDED);
    }
  }

  getNextNews(newsEntry: NewsEntry, newsEntries: NewsEntry[]): Promise<NewsEntry> {
    const newsEntryIndex: number = newsEntries.findIndex((entry: NewsEntry) => entry.id === newsEntry.id);
    if (newsEntryIndex !== newsEntries.length - 1) {
      return Promise.resolve(newsEntries[newsEntryIndex + 1]);
    }
    return Promise.resolve(null);
  }

  async pause(newsEntry: NewsEntry) {
    const authenticated: boolean = await this.apiService.isAuthenticated();

    if (!authenticated) {
      return;
    }
    return this.sendEndPlayStats(newsEntry, EndReason.PAUSED);
  }

  async sendStartPlayStats(newsEntry: NewsEntry, startReason: StartReason) {
    const startPlayStat: StartPlayStat = {
      news_id: newsEntry.id,
      play_id: this.currentNewsUUID,
      start_play_time: new Date().toISOString(),
      start_reason: startReason
    };

    return this.apiService.post('sendstartplaystats/', [startPlayStat])
      .pipe(first())
      .toPromise();
  }

  async sendEndPlayStats(newsEntry: NewsEntry, endReason: EndReason) {
    const endPlayStat: EndPlayStat = {
      news_id: newsEntry.id,
      play_id: this.currentNewsUUID,
      end_play_time: new Date().toISOString(),
      end_reason: endReason
    };

    return this.apiService.post('sendendplaystats/', [endPlayStat])
      .pipe(first())
      .toPromise();
  }
}
