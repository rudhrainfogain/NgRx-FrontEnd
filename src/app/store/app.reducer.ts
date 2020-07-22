import * as FromPosts from './reducers/posts.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  posts: FromPosts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  posts: FromPosts.postsReducer,
};
