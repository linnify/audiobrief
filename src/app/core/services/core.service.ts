import { Injectable } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(
    private apiService: ApiService,
  ) { }

  sendFeedback(feedback: string) {

    return this.apiService.post('suggestgeneral/', {
      'suggested_content': feedback
    });
  }
}
