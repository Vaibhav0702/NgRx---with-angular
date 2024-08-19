import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService : HttpService) { }



//.pipe(map(data => data as User[]))  it will map the data as UserInterFace // Models or USer[]

  getAllUser(): Observable<User[]> {
    return this.httpService.get('/users')
      .pipe(map(data => data as User[]));
  }

// get User By Id
  getUser(id : number) : Observable<User>{
    return this.httpService.get('/users/' + id)
  }




  getAllPost(): Observable<Post[]> {
    const data: Post[] = [{
      title: 'post 1', id: 1,
      comments: [{id: 11, description: 'comment 1'}, {id: 13, description: 'comment 2'}]
    }, {
      title: 'post 2', id: 2,
      comments: [{id: 121, description: 'comment 3'}, {id: 15, description: 'comment 4'}]
    }];

    return new Observable(observer => {
      observer.next(data);
    });
  }











}
