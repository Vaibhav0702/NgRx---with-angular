import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { UserListRequestAction, UserListSuccessAction } from 'src/app/actions/user-action';
import { User } from 'src/app/models/user';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from 'src/app/reducer';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  constructor(private apiService: ApiService, private store: Store<RootReducerState>) {

  }


  ngOnInit() {
    this.fetchData();
  }




  fetchData() {


    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).subscribe((data) => {

      if (!data[0] && !data[1]) {

        this.store.dispatch(new UserListRequestAction());

        this.apiService.getAllUser().subscribe((data => {
          console.warn(data)
          this.store.dispatch(new UserListSuccessAction({ data }));
        }));

      }
    })

    getUserData.subscribe((data) => {
      this.users = data;
      console.warn(data)
    })
  }




}
