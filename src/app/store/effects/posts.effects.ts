import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as PostsActions from '../actions/posts.actions';
import { switchMap, map } from 'rxjs/operators';
import { Post } from 'src/app/posts/post.model';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  @Effect()
  fetchPosts = this.actions$.pipe(
    ofType(PostsActions.FETCH_POSTS),
    switchMap(() => {
      return this.http.get<Post[]>('http://localhost:8080/get');
    }),
    map((posts) => {
      return posts.map((post) => {
        return {
          ...post,
        };
      });
    }),
    map((posts) => {
      return new PostsActions.SetPosts(posts);
    })
  );
  @Effect()
  addPost = this.actions$.pipe(
    ofType(PostsActions.START_ADD),
    switchMap((postAction: PostsActions.StartAdd) => {
      return this.http.post<Post>('http://localhost:8080/add', {
        title: postAction.payload.title,
        body: postAction.payload.body,
      });
    }),
    map((post) => {
      return new PostsActions.AddPost(post);
    })
  );
  @Effect()
  startUpdate = this.actions$.pipe(
    ofType(PostsActions.START_UPDATE),
    switchMap((postAction: PostsActions.StartUpdate) => {
      return this.http.put<Post>('http://localhost:8080/update', {
        id: postAction.payload.id,
        title: postAction.payload.post.title,
        body: postAction.payload.post.body,
      });
    }),
    map((post) => {
      return new PostsActions.EditPost({ post: post, id: post.id });
    })
  );

  @Effect()
  deletePost = this.actions$.pipe(
    ofType(PostsActions.START_DELETE),
    switchMap((postAcion: PostsActions.StartDelete) => {
      return this.http.delete<Post>(
        'http://localhost:8080/delete/' + postAcion.payload
      );
    }),
    map((post) => {
      return new PostsActions.DeletePost(post.id);
    })
  );
}
