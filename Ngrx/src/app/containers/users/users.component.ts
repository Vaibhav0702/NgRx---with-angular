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
  loading = false;
  error = false;

  constructor(private managerService : ManagerService) {

  }


  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
   const observer$ =  this.managerService.getUserList()
   const userData$ =  observer$[1];
   const loading$ = observer$[0];
   const error$ = observer$[2];





   userData$.subscribe((data)=>{
    this.users = data
   })


   loading$.subscribe((data)=>{
     this.loading = data;
   })

   error$.subscribe((data)=>{
    this.error = data;
  })





  }




  tryAgain(){

    this.managerService.getUserList(true);
  }


}
