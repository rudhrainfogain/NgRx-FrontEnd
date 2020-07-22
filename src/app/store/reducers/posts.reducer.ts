import { Post } from '../../posts/post.model';
import * as PostsActions from '../actions/posts.actions';

export interface State {
  posts: Post[];
}
const initialState: State = {
  posts: [
    // new Post(1, 'Post One', 'Body One'),
    // new Post(2, 'Post Two', 'Body Two'),
  ],
};

export function postsReducer(
  state = initialState,
  action: PostsActions.PostsActions
) {
  switch (action.type) {
    case PostsActions.SET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case PostsActions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case PostsActions.EDIT_POST:
      let index;
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id === action.payload.post.id) {
          index = i;
        }
      }
      const updatedPost = {
        ...state.posts[index],
        ...action.payload.post,
      };
      const updatedPosts = [...state.posts];
      updatedPosts[index] = updatedPost;
      return {
        ...state,
        posts: updatedPosts,
      };
    case PostsActions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post, index) => {
          return post.id !== action.payload;
        }),
      };
    case PostsActions.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts],
      };
    default:
      return state;
  }
}

// const updatedPost = {
//   ...state.posts[action.payload.index],
//   ...action.payload.post,
// };
// const updatedPosts = [...state.posts];
// updatedPosts[action.payload.index] = updatedPost;
// return {
//   ...state,
//   posts: updatedPosts,
// };

// const updatedPosts = [
//   ...state.posts.map((p) => {
//     if (p.id === action.payload.id) {
//       p = action.payload;
//     }
//   }),
// ];
