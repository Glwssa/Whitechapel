import { TVService } from './../tv.service';
import { SocketsService } from 'src/app/global/services';
import { TasksService } from 'src/app/global/services';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';

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

  constructor(private tvService: TVService, private socketService: SocketsService) {
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
    this.myUserID = 'me';
    this.userIDToTreat = 'Stratos';
    this.msg = 'whats up';
    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg);
    });
  }

  increment() {
    ++this.round;
  }
  deincrement() {
    --this.round;
  }

  satur() {
    this.flag = true;
    this.dead = false;
    this.exmpl();
  }

  public exmpl() {
    this.tvService.sendMessageToClients(this.msg, this.userIDToTreat).subscribe((data)=>{
      console.log(data);
      this.x=data.message;
    });
    
  }


}


