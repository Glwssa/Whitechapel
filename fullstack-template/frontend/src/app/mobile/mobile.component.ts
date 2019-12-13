import { Globals } from './../global/globl';
import { Component, OnInit, HostBinding, Output } from '@angular/core';
import { MobileLoginComponent } from '../mobilelogin/mobile-login.component';
import { mcall } from 'q';



@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {

  prevRow: string;
  names = ['Stratos', 'Kostas', 'Natasa', 'Andreas', 'Panos', 'Giannis', 'Ete'];
  player: string;
  roles = ['JACK THE REAPER', 'CONSTABLE', 'PHYSICIAN', 'MEDIUM', 'JESTER', 'VIGILANTE', 'MAYOR'];
  role: string;
  currentRole: string;
  mayorDeclaration: boolean;
  playerSelectionAvailable: Boolean;
  timerCounter:number;
  


  timerClass = class Timer {
    constructor(public counter = 30) {


        

        let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            //console.log("timer: "+this.counter)
            if(this.counter>=10){document.getElementById("countdown").innerHTML="00:"+this.counter.toString();}
            if(this.counter<10){document.getElementById("countdown").innerHTML="00:0"+this.counter.toString();}

            if(this.counter === 0){ 
              clearInterval(intervalId);
              MobileComponent.prototype.sendPlayerVotingInfo();
              
            
            }
        }, 1000);

      }

      


  }
  

  

  constructor(public globals: Globals) {
    this.prevRow = '';
    this.player = this.names[2];
    this.role = this.roles[0];
    this.mayorDeclaration = false;
    this.playerSelectionAvailable = true;
    this.timerCounter = 30;
    
  }

  ngOnInit() {
    document.getElementById('mySidebar').style.display = 'none';
    var retrievedObject = localStorage.getItem('user');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    this.closeMayorPanel();
    
    this.setPhase("DEBATE");

    //this.invokePopUp("I USE THIS", "TO SEND TOASTS");
    //setTimeout(this.timerf,1000);
    
   this.beginCountdown();



  }



  beginCountdown(){

    var timerCountDown = new this.timerClass();
    
  }

  


  
  




  openSidebar() {
    document.getElementById('mySidebar').style.display = 'block';
    document.getElementById('mySidebar').style.width = '100%';
    document.getElementById('mySidebar').style.backgroundColor = 'black';
  }

  rowSelect(row: string) {

    if (this.playerSelectionAvailable){
      if (this.prevRow !== row) {
      console.log('row: ' + row);
      console.log('prevRow: ' + this.prevRow);
      if (!this.prevRow) {
        this.prevRow = row;
        document.getElementById(row).style.backgroundColor = 'black';
      } else {
        document.getElementById(row).style.backgroundColor = 'black';
        document.getElementById(this.prevRow).style.backgroundColor = 'transparent';
        this.prevRow = row;
      }


      }
    }
    else{console.log("Player Selection Unavailable");}

  }

  closeSidebar() {
    document.getElementById('mySidebar').style.display = 'none';
  }

  setCurrentRole(role: string) {
    this.currentRole = role;
    console.log('current role :' + this.currentRole);
    this.globals.role = this.currentRole;
  }




  enableMayorPanel(){

    (<HTMLElement>document.getElementById('popupMayor')).style.visibility="visible";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="visible";
    (<HTMLElement>document.getElementById('blurOverlay')).className="blur";
    
    console.log("Mayor Panel activated");

  }

  closeMayorPanel(){
    
    (<HTMLElement>document.getElementById('popupMayor')).style.visibility="hidden";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="hidden";
    (<HTMLElement>document.getElementById('blurOverlay')).className="noblur";
    
    console.log("Mayor Panel deactivated");
    
  }

  setMayorshipToTrue(){

    this.mayorDeclaration = true;

    console.log("Mayor Declared Role!");
    this.closeMayorPanel();
  }


  setPlayerSelectionAvailable(v:boolean){

    this.playerSelectionAvailable = v;

  }



  setPopUpTexts(Top:string, Bottom:string){
    (<HTMLElement>document.getElementById('popupTopText')).innerHTML=Top;
    (<HTMLElement>document.getElementById('popupBottomText')).innerHTML=Bottom;
  }

  setPhaseTexts(Top:string, Bottom:string){
    (<HTMLElement>document.getElementById('phaseName')).innerHTML=Top;
    (<HTMLElement>document.getElementById('phaseDescription')).innerHTML=Bottom;
  }















  setPhase(phase:string){

    if (phase == "DEBATE"){
        this.setPhaseTexts("DEBATE", "DISCUSS WITH OTHER PLAYERS")
        this.setPlayerSelectionAvailable(false);
        //(<HTMLElement>document.getElementById('playerRow')).style.opacity="0.5";
    }

    if (phase == "VOTE"){
      this.setPhaseTexts("VOTE", "SELECT PLAYERS FOR ELIMINATION")
      this.setPlayerSelectionAvailable(true);
      //(<HTMLElement>document.getElementById('playerRow')).style.opacity="1";
      
    }
  }






  invokePopUp(topText: string, bottomText:string){

    this.setPopUpTexts(topText,bottomText);
    (<HTMLElement>document.getElementById('blurOverlay')).className="blur";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="visible";
    console.log("TOAST: "+topText+" "+bottomText);

  }
    
      
    
   sendPlayerVotingInfo(){

    console.log("Countdown Complete");

  }  
    
    




  



}
