import { Action } from '@ngrx/store';
import { Post } from '../../posts/post.model';

export const FETCH_POSTS = '[Posts] Fetch Posts';
export const SET_POSTS = '[Posts] Set Posts';
export const START_ADD = '[Posts] Start add Posts';
export const ADD_POST = '[Posts] Add Post';
export const START_UPDATE = '[Posts] Start Update';
export const EDIT_POST = '[Posts] Edit Post';
export const GET_POSTS = '[Posts] Get Posts';
export const START_DELETE = '[Posts] Start Delete';
export const DELETE_POST = '[Posts] Delete Post';

export class AddPost implements Action {
  readonly type = ADD_POST;
  constructor(public payload: Post) {}
}

export class StartAdd implements Action {
  readonly type = START_ADD;
  constructor(public payload: Post) {}
}

export class StartUpdate implements Action {
  readonly type = START_UPDATE;
  constructor(public payload: { post: Post; id: number }) {}
}

export class EditPost implements Action {
  readonly type = EDIT_POST;
  constructor(public payload: { post: Post; id: number }) {}
}
export class GetPosts implements Action {
  readonly type = GET_POSTS;
}

export class StartDelete implements Action {
  readonly type = START_DELETE;
  constructor(public payload: number) {}
}

export class DeletePost implements Action {
  readonly type = DELETE_POST;
  constructor(public payload: number) {}
}

export class FetchPosts implements Action {
  readonly type = FETCH_POSTS;
}
export class SetPosts implements Action {
  readonly type = SET_POSTS;
  constructor(public payload: Post[]) {}
}
export type PostsActions =
  | GetPosts
  | AddPost
  | StartAdd
  | EditPost
  | DeletePost
  | FetchPosts
  | SetPosts;
