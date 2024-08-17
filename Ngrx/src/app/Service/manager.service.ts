import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducer';
import { ApiService } from './api.service';
import { combineLatest, Observable, take } from 'rxjs';
import { UserAddAction, UserDeleteAction, UserListErrorAction, UserListRequestAction, UserListSuccessAction, UserUpdateAction } from '../actions/user-action';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor( private store: Store<RootReducerState> , private apiService: ApiService) { }


  //get Users
  getUserList(force = false) : [Observable<boolean> , Observable<User[]> , Observable<boolean>] {

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ : Observable<User[]> = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);
   

  // .pipe(take(1)) it will subscribe only once

  // combineLatest([loaded$, loading$]) use for combine subscription of loaded and loading

    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {

      if ((!data[0] && !data[1]) || force) {

        this.store.dispatch(new UserListRequestAction());

        this.apiService.getAllUser().subscribe((data) => {
          console.warn(data)
          this.store.dispatch(new UserListSuccessAction({ data }));
        }, error =>{
          this.store.dispatch(new UserListErrorAction());
        }
      );

      }
    })

     return [ loading$ , getUserData$ , getError$ ];
  }


 //deleteUser 

 deleteUsers(id : number){
   // first call api then update store
   this.store.dispatch(new UserDeleteAction({id}))
 }

 //updateUser

 updateUser(data : User){

  //first send details to api then set to store
this.store.dispatch(new UserUpdateAction({data}));

  
 }


 addUser(data : User){
  this.store.dispatch(new UserAddAction({data}))
 }





}
