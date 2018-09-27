import {Action} from '@ngrx/store';
import {TagTopic} from '../types/topic';

export const LOAD_TOPICS = '[Topics] Load Topics';
export const LOAD_TOPICS_SUCCESS = '[Topics] Load Topics Success';
export const LOAD_TOPICS_FAIL = '[Topics] Load Topics Fail';

export const LOAD_USER_TOPICS = '[Topics] Load User Topics';
export const LOAD_USER_TOPICS_SUCCESS = '[Topics] Load User Topics Success';
export const LOAD_USER_TOPICS_FAIL = '[Topics] Load User Topics Fail';

export const LOAD_PREFERENCES = '[Topics] Load Preferences';
export const LOAD_PREFERENCES_SUCCESS = '[Topics] Load Preferences Success';
export const LOAD_PREFERENCES_FAIL = '[Topics] Load Preferences Fail';

export const CHANGE_PREFERENCES = '[Topics] Change Preferences';
export const CHANGE_PREFERENCES_SUCCESS = '[Topics] Change Preferences Success';
export const CHANGE_PREFERENCES_FAIL = '[Topics] Change Preferences Fail';

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

export class LoadUserPreferences implements Action {
  readonly type = LOAD_PREFERENCES;
  constructor() {}
}

export class LoadUserPreferencesSuccess implements Action {
  readonly type = LOAD_PREFERENCES_SUCCESS;
  constructor(public preferences: boolean) {}
}

export class LoadUserPreferencesFail implements Action {
  readonly type = LOAD_PREFERENCES_FAIL;

  constructor(public error: any) {}
}

export class ChangePreferences implements Action {
  readonly type = CHANGE_PREFERENCES;

  constructor(public preferences: boolean) {}
}

export class ChangePreferencesSuccess implements Action {
  readonly type = CHANGE_PREFERENCES_SUCCESS;

  constructor(public preferences: any) {}
}

export class ChangePreferencesFail implements Action {
  readonly type = CHANGE_PREFERENCES_FAIL;

  constructor(public error: any) {}
}

export type TopicsActions =
  | LoadTopics
  | LoadTopicsSuccess
  | LoadTopicsFail
  | LoadUserTopics
  | LoadUserTopicsSuccess
  | LoadUserTopicsFail
  | LoadUserPreferences
  | LoadUserPreferencesSuccess
  | LoadUserPreferencesFail
  | ChangePreferences
  | ChangePreferencesSuccess
  | ChangePreferencesFail;
