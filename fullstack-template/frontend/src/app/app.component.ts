import { Component } from '@angular/core';
import { SocketsService } from './global/services';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'ami-fullstack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /*animations: [ 
    trigger,
    state,
    style,
    animate,
    transition,
    // animation triggers go here
  ]*/
})
export class AppComponent {

  constructor(private socketsService: SocketsService) {
    // Connect to sockets server on startup
    this.socketsService.initAndConnect();




    //How to consume an event
    this.socketsService.syncMessages('eventName').subscribe((data)=>{
      console.log('The message i received for this event is: ', data);
    });
    
  }
}
