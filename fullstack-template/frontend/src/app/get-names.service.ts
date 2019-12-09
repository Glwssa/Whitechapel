import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GetNamesService {

  private hostUrl: string;

  constructor(private http: HttpClient) { 
    this.hostUrl = environment.host;
  }


  public getNames(msg , toUserID) {
    //  return this.http.post(`${this.hostURl}/api/example/getNames`,
    //  return this.http.post(`http://192.168.99.100:8080/api/example/getNames`
    return this.http.post(`http://192.168.99.100:8080/api/example/getNames`,
    {
      message: {
        scream: msg,
        userID: toUserID
      }
      , event: 'getNames'
            }
        );
    }



}
