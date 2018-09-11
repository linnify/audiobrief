import {EndReason} from './end-reason';

export interface EndPlayStat {
  news_id: number;
  play_id?: string;
  end_play_time: string;
  end_reason: EndReason;
}
