import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Artist} from "../models/artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  addArtist(artist:Artist):Observable<Artist>{
    return this.http.post<Artist>(`${this.apiServerUrl}/artiste/addartiste`,artist,
      {headers:this.requestHeader});
  }

  saveArtist(code:number):Observable<number>{
    return this.http.post<number>(`${this.apiServerUrl}/artiste/saveartiste`,code,
      {headers:this.requestHeader}).pipe(catchError(error => {
      return throwError(error.error);
    }));
  }

  resendCode():Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/artiste/resendcode`,
      {headers:this.requestHeader});
  }

}
