import { Injectable } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {TagTopic, Topic} from '../types/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTopics(): Observable<Topic[]> {
    return this.apiService.get<Topic[]>('topics');
  }

  getUserTagsTopics(): Observable<TagTopic[]> {
    return this.apiService.get<TagTopic[]>('gettagstopics/');
  }

  saveTopics(topics: TagTopic[]): Promise<TagTopic[]> {
    return this.apiService.post<TagTopic[]>('savetagstopics/', topics)
      .pipe(first())
      .toPromise();
  }

  suggestTopics(suggestions: string): Promise<any> {
    const body = {
      suggested_topic: suggestions
    };
    return this.apiService.post('suggesttopic', body)
      .pipe(first()).toPromise();
  }
}
