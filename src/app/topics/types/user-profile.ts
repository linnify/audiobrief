import {Topic} from './topic';

export class UserProfile {
  id: number;
  topics: Topic[];
  name: string;
  icon_file: string;
  icon_file_sel: string;
}
