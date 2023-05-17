import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  private jwt = localStorage.getItem('jwtToken');

  getCurrentUserChat():Observable<any[]> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any[]>(`${this.apiServerUrl}/chats/getCurrentUserChat`,{headers});
  }

  getLastMssg(profileId:string):Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any>(`${this.apiServerUrl}/chats/lastmessage/`+profileId,{headers});
  }


}
