import { Injectable } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Topic} from '../types/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(
    private apiService: ApiService
  ) { }

  getTopics(): Observable<Topic[]> {

    return this.apiService.get('topics')
      .pipe(
        map((receivedTopics: Topic[]) => {
          console.log(receivedTopics);

          return receivedTopics;
        })
      );
  }

  suggestTopics(suggestions: string): Promise<any> {
    return this.apiService.post('suggesttopic', suggestions)
      .pipe(first()).toPromise();
  }
}
