import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeWhile } from 'rxjs';
import { User } from 'src/app/models/user';
import { ManagerService } from 'src/app/Service/manager.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnDestroy {

  isAlive = true;

  user !: User;

  constructor(private activeRoute: ActivatedRoute, private manageService: ManagerService) {
    // this.activeRoute.params.subscribe(data =>{
    //   this.manageService.getUserById(data['id']).subscribe(user => {
    //      console.log(user)
    //   })
    // })


    this.fetchData()
  }


  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const user$ = this.activeRoute.params.pipe(map(data => data['id']),
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        return this.manageService.getUserById(id);
      }), filter(res => !!res));
    user$.subscribe(data => {
      this.user = data;
    });
  }







}
