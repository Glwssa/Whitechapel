import { Globals } from './../global/globl';
import { Component, OnInit, ElementRef } from '@angular/core';
import { SmartSpeakerService } from '../smart-speaker.service';


@Component({
  selector: 'ami-fullstack-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss']

})
export class RoleInfoComponent implements OnInit {

  role: string;
  info: string;
  roleAvatar: string;
  
  infoTexts: [

    "AS JACK THE RIPPER, YOU PLAY THE ROLE OF A LEGENDARY SERIAL KILLER TORMETING THE WHITECHAPEL DISTRICT OF LONDON.YOUR ABILITY, KILL, ALLOWS YOU TO SELECT ONE PLAYER EACH NIGHT FOR ELIMINATION. YOUR GOAL IS TO ELIMINATE ALL PLAYER WITHOUT THEM DISCOVERING YOU.",
    "AS THE CONSTABLE"

  ]

  roleIcons = ["https://i.imgur.com/9LzwD2L.png",
  "https://i.imgur.com/Hl9HvHp.png",
  "https://i.imgur.com/VZVnvpp.png",
  "https://i.imgur.com/W3WK2IQ.png",
  "https://i.imgur.com/vth8OLN.png",
  "https://i.imgur.com/cIwiHJe.png",
  "https://i.imgur.com/yb3YgnB.png"];

  roleIconsCores = ["Constable","Jester","Vigilante","Mayor","Medium","Jack the Reaper", "Physician"];
  jacktxt:string;
  mediumtxt:string;
  constable:string;
  physiciantxt:string;
  jestertxt:string;
  vigilantetxt:string;
  mayor:string;

  constructor(private _smartSpeaker: SmartSpeakerService, public globals: Globals) {
    this.roleAvatar = 'https://i.imgur.com/TIk7nCa.png';
    // tslint:disable-next-line: max-line-length
    
    console.log(this.role);
    this.info = "INFO LOADING";
    
  }

  ngOnInit() {
    this.role = this.globals.role;
    this.initInfo();
    this.changeAvatar();
    this._smartSpeaker.addCommand('blind',()=>{
      this.initInfo();
      this.voice();
    });
  }

  

  initInfo(){

      
      if (this.role == "Jack the Reaper"){this.info = "AS JACK THE RIPPER, YOU PLAY THE ROLE OF A LEGENDARY SERIAL KILLER TORMETING THE WHITECHAPEL DISTRICT OF LONDON.YOUR ABILITY, KILL, ALLOWS YOU TO SELECT ONE PLAYER EACH NIGHT FOR ELIMINATION. YOUR GOAL IS TO ELIMINATE ALL PLAYER WITHOUT THEM DISCOVERING YOU."}
      if (this.role == "Constable"){this.info = "AS THE CONSTABLE, YOU PLAY THE ROLE OF A POLICE INVESTIGATOR. YOUR ABILITY, INVESTIGATION, ALLOWS YOU TO SELECT ONE PLAYER EACH NIGHT AND GAIN INFORMATION ABOUT THE PLAYER'S CONDITION AS FOLLOWS: AT HOME , NOT AT HOME AND IF ALONE OR NOT ALONE. YOUR GOAL IS TO DISCOVER THE SERIAL KILLER."}
      if (this.role == "Physician"){this.info = "AS THE PHYSICIAN, YOU PLAY THE ROLE OF A MEDIC. YOUR ABILITY, HEAL, ALLOWS YOU TO SELECT ONE PLAYER EACH NIGHT AND PROTECT HER/HIM AGAINST OTHER PLAYER'S ATTAKCS. YOU MAY USE THIS ABILITY ON YOURSELF 2 TIMES. YOUR GOAL IS TO DISCOVER THE SERIAL KILLER." }
      if (this.role == "Medium"){this.info = "AS THE MEDIUM, YOU PLAY THE ROLE OF A PSYCHIC WHO CAN COMMUNICATE WITH THE DECEASED. YOUR ABILITY, SEANCE, ALLOWS THE DECEASED PLAYERS TO SEND YOU WHO THEY BELIEVE IS THE SERIAL KILLER. YOUR GOAL IS TO DISCOVER THE SERIAL KILLER." }
      if (this.role == "Jester"){this.info = "AS THE JESTER, YOU PLAY THE ROLE OF THE WILDCARD. YOUR ABILITY, NIGHT WALK, ALLOWS YOU TO APPEAR AS 'NOT AT HOME' TO ANY INVESTIGATION. YOUR GOAL IS TO GET HANGED BY THE OTHER PLAYERS THROUGH VOTING." }
      if (this.role == "Vigilante"){this.info = "AS THE VIGILANTE, YOU PLAY THE ROLE OF AN ABOVE THE LAW GUARDIAN. YOUR ABILITY, EXECUTE, ALLOWS YOU TO KILL ONE PLAYER ONCE IN THE GAME. IF YOU USE YOUR ABILITY ON A ROLE OTHER THAN THAT OF JACK THE REAPER, YOU WILL BE ELIMINATED THE FOLLOWING NIGHT AND WILL NOT BE ABLE TO ACHIEVE TEAM VICTORY. YOUR GOAL IS TO DISCOVER THE SERIAL KILLER." }
      if (this.role == "Mayor"){this.info = "AS THE MAYOR, YOU PLAY THE ROLE OF THE DISTRICT LEADER. YOU DO NOT POSSESS A NIGHT TIME ABILITY, BUT YOU MAY DECLARE YOUR ROLE DURING DAY TIME IN DEBATE. IF YOUR ROLE IS DECLARED, YOUR VOTE COUNTS AS 2 IN THE FOLLOWING VOTING PHASE. YOUR GOAL IS TO DISCOVER THE SERIAL KILLER." }

  
    }



  changeAvatar(){


    var g = this.roleIconsCores.indexOf(this.role);
    this.roleAvatar = this.roleIcons[g];

  }
  voice(){
    this._smartSpeaker.speak(this.info);

  }
}
