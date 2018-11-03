import {createEntityAdapter, EntityState} from '@ngrx/entity';
import * as topicsActions from './topics.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Topic} from '../types/topic';
import {UserProfile} from '../types/user-profile';

export const topicsAdapter = createEntityAdapter<Topic>({
  selectId: (topic: any) => topic.label
});

export interface TopicsState extends EntityState<Topic> {
  loading: boolean;
  loaded: boolean;
  selectedTopicsIds: number[];
  preferences: any;
  userProfiles: UserProfile[];
}

export const initialState: TopicsState = topicsAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectedTopicsIds: [],
  preferences: undefined,
  userProfiles: undefined
});

export function reducer(
  state: TopicsState = initialState,
  action: topicsActions.TopicsActions
): TopicsState {
  switch (action.type) {
    case topicsActions.LOAD_TOPICS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case topicsActions.LOAD_TOPICS_SUCCESS: {
      return topicsAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case topicsActions.LOAD_USER_TOPICS_SUCCESS: {
      const selectedTopicsIds: number[] = action.tagTopics.map(topic => topic.topic_id);
      return {
        ...state,
        selectedTopicsIds
      };
    }
    case topicsActions.CHANGE_PREFERENCES_SUCCESS:
    case topicsActions.LOAD_PREFERENCES_SUCCESS: {
      return {
        ...state,
        preferences: action.preferences
      };
    }
    case topicsActions.LOAD_USER_PROFILES_SUCCESS: {
      return {
        ...state,
        userProfiles: action.userProfiles
      };
    }
    default:
      return state;
  }
}

export const selectTopicsState = createFeatureSelector<TopicsState>('topics');
export const {selectEntities, selectAll } = topicsAdapter.getSelectors(selectTopicsState);
export const selectTopicsLoading = createSelector(
  selectTopicsState,
  (state: TopicsState) => state.loading
);

export const selectTopicsLoaded = createSelector(
  selectTopicsState,
  (state: TopicsState) => state.loaded
);

export const selectSelectedTopicsIds = createSelector(
  selectTopicsState,
  (state: TopicsState) => state.selectedTopicsIds
);

export const selectPreferences = createSelector(
  selectTopicsState,
  (state: TopicsState) => state.preferences
);

export const selectUserProfiles = createSelector(
  selectTopicsState,
  (state: TopicsState) => state.userProfiles
);
