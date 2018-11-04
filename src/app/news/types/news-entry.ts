import {Topic} from '../../topics/types/topic';

export class NewsEntry {
  id: number;
  tags: string[];
  source: string;
  url: string;
  title: string;
  text_content: string;
  edited_summary: string;
  date_published: Date;
  uploaded_at: Date;
  start_at: Date;
  audio_source: string;
  summary_source: string;
  number_of_views: number;
  number_of_shares: number;
  number_of_listens: number;
  credibility: number;
  topic: Topic;
  mp3_file: string;
  mp3_length: number;
  uploader: number;
  source_new?: SourceNew;
}

export class SourceNew {
  id: number;
  logo_file: string;
  home_url: string;
  name: string;
}
