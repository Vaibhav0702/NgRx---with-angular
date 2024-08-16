import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

   users : User[] = []

  constructor(private apiService : ApiService){

  }


  ngOnInit(){
       this.fetchData();
  }




  fetchData(){
      this.apiService.getAllUser().subscribe((data =>{
        console.warn(data)
        this.users = data;
      }))
  }




}
