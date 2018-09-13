import { createSelector } from '@ngrx/store';
import { getRouterState, RouterStateUrl } from '../reducers';
import * as fromRouter from '@ngrx/router-store';

export const selectRouterState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState<RouterStateUrl>) => {
    return state && state.state;
  }
);

export const selectParams = createSelector(
  selectRouterState,
  (state: RouterStateUrl) => {
    return state.params;
  }
);

export const selectNewsId = createSelector(
  selectRouterState,
  (state: RouterStateUrl) => {
    if (state.params) {
      return state.params.newsId;
    }
  }
);
