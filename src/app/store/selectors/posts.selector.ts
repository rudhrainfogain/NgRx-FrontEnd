import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as FromPosts from '../reducers/posts.reducer';

export const selectedFeature = createFeatureSelector<FromPosts.State>('posts');

export const selectProductsFeature = createSelector(
  selectedFeature,
  (state: FromPosts.State) => state.posts
);
