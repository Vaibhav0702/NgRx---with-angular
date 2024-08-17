import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { ManagerService } from 'src/app/Service/manager.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user !: User;


constructor(private managerService : ManagerService , private dialog : MatDialog){

}


  delete(id : number){
     this.managerService.deleteUsers(id)
  }


  update(){
     this.dialog.open(UpdateUserComponent , {width : '300px'  , data : this.user})
  }

}
