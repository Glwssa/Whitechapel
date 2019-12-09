import { TVService } from './../tv.service';
import { SocketsService } from 'src/app/global/services';
import { TasksService } from 'src/app/global/services';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LeapService, Gestures } from 'src/app/leap.service';
//import Artyom from '../smart-speaker.service';

@Component({
  selector: 'ami-fullstack-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  image: string;
  round: number;
  flag: boolean;
  norm: string;
  grey: string;
  arrow: string;
  dead: boolean;
  name: string;
  public myUserID;
  public userIDToTreat;
  public msg;
  public socketEvents: {event: string, message: any}[];
  public playerStateURL;
  response: any;
  x: any;
  playerState: string[];

  constructor(private tvService: TVService, private socketService: SocketsService, private _leapservice: LeapService) {
    this.socketEvents = [];
    this.image = 'https://i.imgur.com/TIk7nCa.png';
    this.arrow = 'https://i.imgur.com/LxivwLt.png';
    this.round = 1;
    this.flag = false;
    this.norm = 'saturate(1)';
    this.grey = 'saturate(0)';
    this.dead = true;
    this.name = 'Strataras';
   }




  ngOnInit() {
    this.sendRound();
    this.myUserID = 'me';
    this.userIDToTreat = 'Stratos';
    this.msg = 'whats up';
    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg);

    });


    //leap motion gesture contoller
    this._leapservice.gestureRecognizer().subscribe((gesture) => {

      if(gesture == Gestures.SWIPE_LEFT){
        console.log("Swipe left in tv compoment");
      }else if (gesture == Gestures.SWIPE_RIGHT){
        console.log("Swipe right in tv compoment");
      }
    });

  }

  increment() {
    ++this.round;
    this.sendRound();
  }
  deincrement() {
    --this.round;
    this.sendRound();
  }

  satur() {
    this.flag = true;
    this.dead = false;
    this.exmpl();
  }

   exmpl() {
    this.tvService.sendMessageToClients(this.msg, this.userIDToTreat).subscribe((data)=>{
      console.log(data);
      this.x = data.message;
      this.playerState = data.message;
    });
  }

  public convertInt( str: string) {
    return parseInt(str);
  }

  public sendRound() {
    this.msg = this.round.toString();
    this.tvService.sendMessageToClients(this.msg, this.userIDToTreat).subscribe((data)=>{
      this.playerState = data.message;
    });
  }

}


