import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TVService {

private hostURl: string;


constructor(private http: HttpClient) {
  this.hostURl = environment.host;

  
}

public sendMessageToClients(msg , toUserID) {
  //  return this.http.post(`${this.hostURl}/api/example/sendMessageToClients`,

  return this.http.post(`http://192.168.99.100:8080/api/example/sendMessageToClients`,
  {
    message: {
      scream: msg,
      userID: toUserID
    }
    , event: 'eventName'
          }
      );
  }


}
