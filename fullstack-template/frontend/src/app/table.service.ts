import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  private hostURl: string;

  constructor(private http: HttpClient) { 
    this.hostURl = environment.host;
  }

  public getTableNames() {
    //  return this.http.post(`${this.hostURl}/api/example/sendMessageToClients`,
    //  return this.http.post(`http://192.168.99.100:8080/api/example/sendMessageToClients`
    //for windows 10 pro docker app
    return this.http.get(`http://192.168.99.100:8080/api/example/getTableNames`);
  }
  public getTableStartBool(){
    return this.http.get(`http://192.168.99.100:8080/api/example/getTableStartBool`);
  }
}
