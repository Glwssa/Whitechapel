import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services';
import { SetNamesService } from './../get-names.service';
import { Router } from '@angular/router';
import { Globals } from './../global/globl';


@Component({
  selector: 'mobilelogin',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  playerAvatar: string;
  playerName: string;
  public myUserID;
  public userIDToTreat;
  public msg;
  public socketEvents: {event: string, message: any}[];
  public playerStateURL;
  response: any;


  constructor(public globals: Globals, private router: Router, private SetNamesService: SetNamesService, private socketService: SocketsService) { 

    this.playerAvatar = "https://i.imgur.com/7Vown38.jpg";
    this.playerName = "Player Unknown";


  }

  ngOnInit() {

    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg); //hmmm?

    });



  }



  changePlayerAvatar(){

    this.playerAvatar = "https://i.imgur.com/7Vown38.jpg";
  }

  setNames() {
    
    this.SetNamesService.setNames(this.playerName, this.userIDToTreat).subscribe((data)=>{
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data))
    });
  }




  localName(){

    //this.playerName = document.getElementById('playerInputBox').value;
    this.playerName = (<HTMLInputElement>document.getElementById('playerInputBox')).value;
    
    this.SetNamesService.setNames(this.playerName, this.userIDToTreat).subscribe((data)=>{
      console.log(data);
      localStorage.setItem("user", JSON.stringify(this.playerName))
    });
    
    console.log("Welcome: "+this.playerName);
    this.setMyName(this.playerName);
    this.router.navigate(['mobileMain']);
  }

  setMyName(myName: string){
    this.globals.myName = myName;
  }
}
