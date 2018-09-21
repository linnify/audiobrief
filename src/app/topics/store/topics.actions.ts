import {Action} from '@ngrx/store';

export const LOAD_TOPICS = '[Topics] Load Topics';
export const LOAD_TOPICS_SUCCESS = '[Topics] Load Topics Success';
export const LOAD_TOPICS_FAIL = '[Topics] Load Topics Fail';

export class LoadTopics implements Action {
  readonly type = LOAD_TOPICS;
  constructor() {}
}

export class LoadTopicsSuccess implements Action {
  readonly type = LOAD_TOPICS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadTopicsFail implements Action {
  readonly type = LOAD_TOPICS_FAIL;
  constructor(public payload: any) {}
}

export type TopicsActions =
  | LoadTopics
  | LoadTopicsSuccess
  | LoadTopicsFail;
