import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPostError, getPostLoaded, getPostLoading, getPosts, getUserById, getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducer';
import { ApiService } from './api.service';
import { combineLatest, Observable, take } from 'rxjs';
import { UserAddAction, UserDeleteAction, UserListErrorAction, UserListRequestAction, UserListSuccessAction, UserUpdateAction } from '../actions/user-action';
import { User } from '../models/user';
import { Comment, Post } from '../models/post';
import { CommentAddAction, CommentDeleteAction, CommentUpdateAction, PostListErrorAction, PostListRequestAction, PostListSuccessAction } from '../actions/post-action';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private store: Store<RootReducerState>, private apiService: ApiService) { }


  //get Users
  getUserList(force = false): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$: Observable<User[]> = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);


    // .pipe(take(1)) it will subscribe only once

    // combineLatest([loaded$, loading$]) use for combine subscription of loaded and loading

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {

      if ((!data[0] && !data[1]) || force) {

        this.store.dispatch(new UserListRequestAction());

        this.apiService.getAllUser().subscribe((data) => {
          console.warn(data)
          this.store.dispatch(new UserListSuccessAction({ data }));
        }, error => {
          this.store.dispatch(new UserListErrorAction());
        }
        );

      }
    })

    return [loading$, getUserData$, getError$];
  }


  //deleteUser 

  deleteUsers(id: number) {
    // first call api then update store
    this.store.dispatch(new UserDeleteAction({ id }))
  }

  //updateUser

  updateUser(data: User) {
    //first send details to api then set to store
    this.store.dispatch(new UserUpdateAction({ data }));

  }


  //add new User
  addUser(data: User) {
    this.store.dispatch(new UserAddAction({ data }))
  }


//get User by Id
  getUserById(id: number, force = false) {

    //get USerFrom reducer if exsist else From Api ;
    const user$ = this.store.select(state => getUserById(state, id));

    user$.pipe(take(1)).subscribe(res => {
      if ( force || !res) {
        return this.apiService.getUser(id).subscribe(data => {
          this.store.dispatch(new UserAddAction({ data }))
        })
      }
    
      return res;
      
    })

    return user$;

  }




  //get All posts
  getAllPost(force = false): [Observable<boolean>, Observable<Post[]>, Observable<boolean>] {
    const post$ = this.store.select(getPosts);
    const loaded$ = this.store.select(getPostLoading);
    const loading$ = this.store.select(getPostLoaded);
    const getError$ = this.store.select(getPostError);

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.apiService.getAllPost().subscribe(res => {
          this.store.dispatch(new PostListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new PostListErrorAction());
        });
      }
    });

    return [loading$, post$, getError$];
  }




  //add comment
  addComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentAddAction({data: comment, postId}));
  }

  //update Comment
  updateComment(comment: Comment, postId: number) {
    this.store.dispatch(new CommentUpdateAction({data: comment, postId}));
  }

  //delete Comment
  deleteComment(commentId: number, postId: number) {
    this.store.dispatch(new CommentDeleteAction({id: commentId, postId}));
  }





}
