import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducer';
import { ApiService } from './api.service';
import { combineLatest, Observable, take } from 'rxjs';
import { UserListErrorAction, UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor( private store: Store<RootReducerState> , private apiService: ApiService) { }


  getUserList(force = false) : [Observable<boolean> , Observable<User[]> , Observable<boolean>] {

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ : Observable<User[]> = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);
   
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
}
