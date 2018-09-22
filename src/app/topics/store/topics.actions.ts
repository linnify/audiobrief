import {Action} from '@ngrx/store';
import {TagTopic} from '../types/topic';

export const LOAD_TOPICS = '[Topics] Load Topics';
export const LOAD_TOPICS_SUCCESS = '[Topics] Load Topics Success';
export const LOAD_TOPICS_FAIL = '[Topics] Load Topics Fail';

export const LOAD_USER_TOPICS = '[Topics] Load User Topics';
export const LOAD_USER_TOPICS_SUCCESS = '[Topics] Load User Topics Success';
export const LOAD_USER_TOPICS_FAIL = '[Topics] Load User Topics Fail';


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

export class LoadUserTopics implements Action {
  readonly type = LOAD_USER_TOPICS;
  constructor() {}
}

export class LoadUserTopicsSuccess implements Action {
  readonly type = LOAD_USER_TOPICS_SUCCESS;
  constructor(public tagTopics: TagTopic[]) {}
}

export class LoadUserTopicsFail implements Action {
  readonly type = LOAD_USER_TOPICS_FAIL;
  constructor(public payload: any) {}
}

export type TopicsActions =
  | LoadTopics
  | LoadTopicsSuccess
  | LoadTopicsFail
  | LoadUserTopics
  | LoadUserTopicsSuccess
  | LoadUserTopicsFail;
