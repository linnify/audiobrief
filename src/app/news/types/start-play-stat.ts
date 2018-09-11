import {StartReason} from './start-reason';

export interface StartPlayStat {
  news_id: number;
  play_id?: string;
  start_play_time: string;
  start_reason: StartReason;
}
