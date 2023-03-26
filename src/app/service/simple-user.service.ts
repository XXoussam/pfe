import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SimpleUser} from "../models/simple-user";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SimpleUserService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  addSimpleUser(simpleUser:SimpleUser):Observable<SimpleUser>{
    return this.http.post<SimpleUser>(`${this.apiServerUrl}/utilisateurSimple/adduser`,simpleUser,
      {headers:this.requestHeader});
  }

  saveSimpleUser(code:number):Observable<number>{
    return this.http.post<number>(`${this.apiServerUrl}/utilisateurSimple/saveuser`,code,
      {headers:this.requestHeader}).pipe(catchError(error => {
      return throwError(error.error);
    }));
  }




}
