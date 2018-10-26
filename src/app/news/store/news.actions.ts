import { Action } from '@ngrx/store';

export const LOAD_NEWS = '[News] Load News';
export const LOAD_NEWS_SUCCESS = '[News] Load News Success';
export const LOAD_NEWS_FAIL = '[News] Load News Fail';

export const PLAY_NEWS = '[News] Play News';
export const PLAY_NEWS_SUCCESS = '[News] Play News Success';
export const PLAY_NEWS_FAIL = '[News] Play News Fail';

export const PAUSE_NEWS = '[News] Pause News';
export const PAUSE_NEWS_SUCCESS = '[News] Pause News Success';
export const PAUSE_NEWS_FAIL = '[News] Pause News Fail';

export const PLAY_NEXT_NEWS = '[News] Play Next News';
export const PLAY_NEXT_NEWS_SUCCESS = '[News] Play Next News Success';
export const PLAY_NEXT_NEWS_FAIL = '[News] Play Next News Fail';

export const SEND_PLAY_NEWS_STATS_SUCCESS = '[News] Send Play News Stats Success';
export const SEND_PLAY_NEWS_STATS_FAIL = '[News] Send Play News Stats Fail';

export const STOP_PLAYER = '[News] Stop Player';

export const ADD_CURRENT_NEWS = '[News] Add Current News';
export const ADD_CURRENT_NEWS_SUCCESS = '[News] Add Current News Success';
export const ADD_CURRENT_NEWS_FAIL = '[News] Add Current News Fail';

export class LoadNews implements Action {
  readonly type = LOAD_NEWS;
  constructor() {}
}

export class LoadNewsSuccess implements Action {
  readonly type = LOAD_NEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadNewsFail implements Action {
  readonly type = LOAD_NEWS_FAIL;
  constructor(public payload: any) {}
}

export class PlayNews implements Action {
  readonly type = PLAY_NEWS;
  constructor(public payload: any) {}
}

export class PlayNewsSuccess implements Action {
  readonly type = PLAY_NEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class PlayNewsFail implements Action {
  readonly type = PLAY_NEWS_FAIL;
  constructor(public error: any) {}
}

export class PauseNews implements Action {
  readonly type = PAUSE_NEWS;
  constructor(public payload: any) {}
}

export class PauseNewsSuccess implements Action {
  readonly type = PAUSE_NEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class PauseNewsFail implements Action {
  readonly type = PAUSE_NEWS_FAIL;
  constructor(public error: any) {}
}

export class PlayNextNews implements Action {
  readonly type = PLAY_NEXT_NEWS;
  constructor(public payload: any) {}
}

export class PlayNextNewsSuccess implements Action {
  readonly type = PLAY_NEXT_NEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class PlayNextNewsFail implements Action {
  readonly type = PLAY_NEXT_NEWS_FAIL;
  constructor(public error: any) {}
}

export class SendPlayNewsStatsSuccess implements Action {
  readonly type = SEND_PLAY_NEWS_STATS_FAIL;
}

export class SendPlayNewsStatsFail implements Action {
  readonly type = SEND_PLAY_NEWS_STATS_FAIL;
  constructor(public error: any) {}
}

export class StopPlayer implements Action {
  readonly type = STOP_PLAYER;
  constructor() {}
}


export class AddCurrentNews implements Action {
  readonly type = ADD_CURRENT_NEWS;
  constructor(public id: number) {}
}

export class AddCurrentNewsSuccess implements Action {
  readonly type = ADD_CURRENT_NEWS_SUCCESS;
  constructor(public payload: any) {}
}

export class AddCurrentNewsFail implements Action {
  readonly type = ADD_CURRENT_NEWS_FAIL;
  constructor(public error: any) {}
}
export type NewsActions =
  | LoadNews
  | LoadNewsSuccess
  | LoadNewsFail
  | PlayNews
  | PlayNewsSuccess
  | PlayNewsFail
  | PauseNews
  | PauseNewsSuccess
  | PauseNewsFail
  | PlayNextNews
  | PlayNextNewsSuccess
  | PlayNextNewsFail
  | SendPlayNewsStatsSuccess
  | SendPlayNewsStatsFail
  | StopPlayer
  | AddCurrentNews
  | AddCurrentNewsSuccess
  | AddCurrentNewsFail;
