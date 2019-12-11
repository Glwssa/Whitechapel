import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SetNamesService {

  private hostUrl: string;

  constructor(private http: HttpClient) { 
    this.hostUrl = environment.host;
  }


  public setNames(msg , toUserID) {
    //  return this.http.post(`${this.hostURl}/api/example/setNames`,
    //  return this.http.post(`http://192.168.99.100:8080/api/example/setNames`
    return this.http.post(`http://192.168.99.100:8080/api/example/setNames`,
    {
      message: {
        scream: msg,
        userID: toUserID
      }
      , event: 'setNames'
            }
        );
    }



}
