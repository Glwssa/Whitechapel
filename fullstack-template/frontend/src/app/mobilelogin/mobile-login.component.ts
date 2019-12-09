import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services';
import { GetNamesService } from './../get-names.service';
import { Router } from '@angular/router';

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


  constructor(private router: Router, private GetNamesService: GetNamesService, private socketService: SocketsService) { 

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
    this.GetNamesService.getNames(this.playerName, this.userIDToTreat).subscribe((data)=>{
      console.log(data);

    });
  }




  localName(){
    //this.playerName = document.getElementById('playerInputBox').value;
    this.playerName = (<HTMLInputElement>document.getElementById('playerInputBox')).value;
    
    console.log("Welcome: "+this.playerName);
    this.router.navigate(['mobileMain'])
  }
}
