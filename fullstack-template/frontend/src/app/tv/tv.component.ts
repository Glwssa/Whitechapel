import { TVService } from './../tv.service';
import { SocketsService } from 'src/app/global/services';
import { TasksService } from 'src/app/global/services';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LeapService, Gestures } from 'src/app/leap.service';
import { SmartSpeakerService } from '../smart-speaker.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


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
  playerState: string[]=[];
  playerName: string[]=[];
  playerAvatar: string[]=[];

  constructor(private tvService: TVService, private socketService: SocketsService, private _leapservice: LeapService, private _smartSpeaker: SmartSpeakerService, private _smartSpeaker2: SmartSpeakerService) {
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
    this.playerName=[];
    this.sendRound();
    this.myUserID = 'me';
    this.userIDToTreat = 'Stratos';
    this.msg = 'whats up';
    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg);

    });

    this._leapservice.cursorRecognizer().subscribe(cursor=>{
      //console.log(cursor)
    })

    //leap motion gesture contoller
    /*this._leapservice.gestureRecognizer().subscribe((gesture) => {
      console.log(gesture)
      if(gesture == Gestures.SWIPE_DOWN){
        console.log("Swipe left in tv compoment");
        this.deincrement();
      }else if (gesture == Gestures.SWIPE_UP){
        console.log("Swipe right in tv compoment");
        this.increment();
      }
    });*/
    this._smartSpeaker.addCommand('next',()=>{
      this.xfactor();
      this.increment();
    });

    this._smartSpeaker2.addCommand('back',()=>{
      this.xfactor();
      this.deincrement();
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
      this.x = data["message"];
      this.playerState = data["message"];
    });
  }

  public convertInt( str: string) {
    return parseInt(str);
  }

  public sendRound() {
    this.msg = this.round.toString();
    this.tvService.sendMessageToClients(this.msg, this.userIDToTreat).subscribe((data)=>{
    //  this.playerState = data[2];
    console.log(data)
      this.playerName = data["message"][0];
      this.playerAvatar = data["message"][1];



      console.log(this.playerAvatar);
      console.log(this.playerName);


    });
  //  console.log(this.playerState);

  }

  public xfactor(){
    this._smartSpeaker.speak('Hello mother fuckers');
  }

}

