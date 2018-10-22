import {LOGOUT} from '../actions';

export function globalLogoutMetaReducer(reducer) {
  return function(state, action) {
    return reducer(
      action.type === LOGOUT ? undefined : state,
      action
    );
  };
}
