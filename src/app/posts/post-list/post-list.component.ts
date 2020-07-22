import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';
import * as PostsActions from '../../store/actions/posts.actions';
import { selectProductsFeature } from 'src/app/store/selectors/posts.selector';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  posts$: Observable<Post[]>;
  subscription: Subscription;

  constructor(
    private store: Store<FromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new PostsActions.FetchPosts());
    this.posts$ = this.store.pipe(select(selectProductsFeature));
  }
  onNewPost() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
