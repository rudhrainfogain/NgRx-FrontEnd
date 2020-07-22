import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Post } from '../post.model';
import * as FromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as PostActions from '../../store/actions/posts.actions';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
})
export class PostAddComponent implements OnInit, OnDestroy {
  id: number;
  post: Post;
  editMode: boolean = false;
  postForm: FormGroup;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    let title: String = '';
    let body: String = '';
    if (this.editMode) {
      this.subscription = this.store
        .select('posts')
        .pipe(
          map((postState) => {
            return postState.posts.find((post, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((post) => {
          this.post = post;
          title = post.title;
          body = post.body;
        });
    }
    this.postForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      body: new FormControl(body, Validators.required),
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new PostActions.StartUpdate({
          post: this.postForm.value,
          id: this.post.id,
        })
      );
    } else {
      this.store.dispatch(new PostActions.StartAdd(this.postForm.value));
    }
    this.onClear();
  }
  onClear() {
    this.postForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDelete() {
    this.onClear();
    this.store.dispatch(new PostActions.StartDelete(this.post.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {}
}
