import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://jsonplaceholder.typicode.com'; // Example API URL

  Auth_Token = 'auth_token';

  constructor( private httpClient : HttpClient) {

   }


   //get data
   get(url: string, params?: any): Observable<any> {
    const data = {params, headers: this.getAuthHeader()};
    return this.httpClient
      .get(this.apiUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }


   private errorHandler(res: any) {
       const error = res.error;
       const keys = Object.keys(error);
       const key = keys[0]
       let message = error[key];

       if(res.status === 401){
        // auth token delete
        //redirect to login page
       }
       if(error[key] instanceof Array){
        message  = error[key][0]
       }
       if(key === 'isTrusted'){
         // this will occure when not connected to internet

       }else{
         message = key + ':' + message
       }

       //call snak bar and show error
      return throwError({messages : message , error})
  }



// get AuthTOken
  private getAuthHeader() : {[header : string] : string | string[]} {
    return {
        Authorization : `Bearer ${localStorage.getItem(this.Auth_Token)}`
    }
  }




}
