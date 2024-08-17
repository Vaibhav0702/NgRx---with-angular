import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';
import { UpdateUserComponent } from 'src/app/components/update-user/update-user.component';
import { User } from 'src/app/models/user';
import { ManagerService } from 'src/app/Service/manager.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = []
  loading = false;
  error = false;

  isAlive = true;

  constructor(private managerService: ManagerService , private dialog : MatDialog) {

  }

  ngOnInit() {
    this.fetchData();
  }


  ngOnDestroy(){
     this.isAlive = false;  // it will unsubscribe all subscribtions on destroy with the help of take while
  }


  fetchData() {
    const observer$ = this.managerService.getUserList()
    const userData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];



    /// pipe(takeWhile(()=> this.isAlive)) it will check if is alive is true then only it will subscribe

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data
    })


    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    })

    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.error = data;
    })

  }




  tryAgain() {

    this.managerService.getUserList(true);
  }


  addUser(){
    this.dialog.open(UpdateUserComponent  , {width : '300px'})
  }


}
