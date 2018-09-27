import {createEntityAdapter, Dictionary, EntityState} from '@ngrx/entity';
import {NewsEntry} from '../types/news-entry';
import * as newsActions from './news.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const newsAdapter = createEntityAdapter<NewsEntry>({
  selectId: (newsEntry: NewsEntry) => newsEntry.id
});

export interface NewsState extends EntityState<NewsEntry> {
  currentNews: NewsEntry;
  playing: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: NewsState = newsAdapter.getInitialState({
  currentNews: undefined,
  playing: false,
  loading: false,
  loaded: false
});

export function reducer(
  state: NewsState = initialState,
  action: newsActions.NewsActions
): NewsState {
  switch (action.type) {
    case newsActions.LOAD_NEWS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case newsActions.LOAD_NEWS_SUCCESS: {
      return newsAdapter.addAll(action.payload, {
        ...state,
        currentNews: action.payload[0],
        loading: false,
        loaded: true
      });
    }
    case newsActions.PLAY_NEXT_NEWS:
    case newsActions.PLAY_NEWS: {
      return {
        ...state
      };
    }
    case newsActions.PLAY_NEXT_NEWS_SUCCESS:
    case newsActions.PLAY_NEWS_SUCCESS: {
      return {
        ...state,
        currentNews: action.payload,
        playing: true
      };
    }
    case newsActions.PAUSE_NEWS: {
      return {
        ...state,
        playing: false
      };
    }
    case newsActions.STOP_PLAYER:
    case newsActions.PLAY_NEXT_NEWS_FAIL:
    case newsActions.PLAY_NEWS_FAIL:
      return {
        ...state,
        playing: false
      };
    default: {
      return state;
    }
  }
}

export const selectNewsState = createFeatureSelector<NewsState>('news');

export const {selectEntities, selectAll } = newsAdapter.getSelectors(selectNewsState);

export const selectNewsLoading = createSelector(
  selectNewsState,
  (state: NewsState) => state.loading
);

export const selectNewsLoaded = createSelector(
  selectNewsState,
  (state: NewsState) => state.loaded
);

export const selectNewsPlaying = createSelector(
  selectNewsState,
  (state: NewsState) => state.playing
);

export const selectCurrentNews = createSelector(
  selectNewsState,
  (state: NewsState) => state.currentNews
);

export const selectNewsEntry = createSelector(
  selectEntities,
  (newsEntities: Dictionary<NewsEntry>, props) => {
    return newsEntities[props.id];
  }
);
