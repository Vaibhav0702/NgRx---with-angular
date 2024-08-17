import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { ManagerService } from 'src/app/Service/manager.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {


  userForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User ,
               private managerService : ManagerService) {

                console.warn(this.data)
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [Validators.required]),
      email: new FormControl(this.data ? this.data.email : null, [Validators.required]),
    });
  }


  addOrUpdateUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value};
    this.managerService.updateUser(updatedUser);
    this.dialogRef.close();
  }

  addUser() {
    this.managerService.addUser(this.userForm.value);
    this.dialogRef.close();
  }

}
