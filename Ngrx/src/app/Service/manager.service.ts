import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from '../reducer';
import { ApiService } from './api.service';
import { combineLatest, Observable } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor( private store: Store<RootReducerState> , private apiService: ApiService) { }


  getUserList(force = false) : [Observable<boolean> , Observable<User[]>] {

    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData : Observable<User[]> = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).subscribe((data) => {

      if ((!data[0] && !data[1]) || force) {

        this.store.dispatch(new UserListRequestAction());

        this.apiService.getAllUser().subscribe((data => {
          console.warn(data)
          this.store.dispatch(new UserListSuccessAction({ data }));
        }));

      }
    })

     return [ loaded$ , getUserData ];
  }
}
