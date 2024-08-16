import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService : HttpService) { }


  getAllUser(): Observable<User[]> {
    return this.httpService.get('/users')
      .pipe(map(data => data as User[]));
  }
}
