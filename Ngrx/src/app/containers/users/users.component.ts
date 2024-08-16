import { Component, OnInit } from '@angular/core';


import { User } from 'src/app/models/user';
import { ManagerService } from 'src/app/Service/manager.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  constructor(private managerService : ManagerService) {

  }


  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
   const userData$ =  this.managerService.getUserList()[1];
   userData$.subscribe((data)=>{
    this.users = data
   })
  }




}
