import {Action} from '@ngrx/store';

export * from './router.actions';

export const LOGOUT = '[LOGOUT] Logout';

export class Logout implements Action {
  readonly type = LOGOUT;
}
