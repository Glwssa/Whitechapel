import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mobilelogin',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.scss']
})
export class MobileLoginComponent implements OnInit {

  playerAvatar: string;
  playerName: string;



  constructor() { 

    this.playerAvatar = "https://i.imgur.com/7Vown38.jpg";
    this.playerName = "Player Unknown";


  }

  ngOnInit() {

    



  }



  changePlayerAvatar(){

    this.playerAvatar = "https://i.imgur.com/7Vown38.jpg";
  }




}
