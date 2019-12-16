import { CookieService } from 'ngx-cookie-service';
import { SocketsService } from './../global/services/core/sockets.service';
import { SetNamesService } from './../get-names.service';
import { Globals } from './../global/globl';
import { Component, OnInit, HostBinding, Output } from '@angular/core';
import { findIndex } from 'rxjs/operators';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {

  prevRow: string;
  names = [];
  avatars = [];
  player: string;
  roles = ['JACK THE REAPER', 'CONSTABLE', 'PHYSICIAN', 'MEDIUM', 'JESTER', 'VIGILANTE', 'MAYOR'];
  role: string;
  currentRole: string;
  mayorDeclaration: boolean;
  playerSelectionAvailable: Boolean;
  timerInitAvailable: Boolean;
  isDayTime: Boolean;
  SelectedPlayer: string;
  public myUserID;
  public userIDToTreat;
  public msg;
  public socketEvents: {event: string, message: any}[];
  public playerStateURL;
  response: any;
  index: number;
  myindex: number;

  monNamae: string;
  skipIndex: number;
  cookieWithName: string;

  timeLeft: number = 3;
  interval;

  //timerCounter:number;
  


  // timerClass = class Timer {
  //   constructor(public counter = 3) {


        

  //       let intervalId = setInterval(() => {
  //           this.counter = this.counter - 1;
  //           //console.log("timer: "+this.counter)
  //           if(this.counter>=10){document.getElementById("countdown").innerHTML="00:"+this.counter.toString();}
  //           if(this.counter<10){document.getElementById("countdown").innerHTML="00:0"+this.counter.toString();}

  //           if(this.counter === 0){ 
  //             clearInterval(intervalId);
  //             MobileComponent.prototype.sendPlayerVotingInfo();
              
            
  //           }
  //       }, 1000);

  //     }

      


  // }






  constructor(private cookieService: CookieService, public globals: Globals, private setNamesService : SetNamesService, private socketService: SocketsService,private eventEmitterService: EventEmitterService) {
    this.prevRow = '';
    this.player = this.names[2];
    this.role = this.roles[0];
    this.mayorDeclaration = false;
    this.playerSelectionAvailable = true;
    this.timerInitAvailable = false;
    this.isDayTime = true;

    
    
  }

  ngOnInit() {
    document.getElementById('mySidebar').style.display = 'none';
    var retrievedObject = localStorage.getItem('user');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    this.closeMayorPanel();
    
    this.setPhase("DEBATE");

    //this.invokePopUp("I USE THIS", "TO SEND TOASTS");
    //setTimeout(this.timerf,1000);
    
  // this.beginCountdown();
  this.startTimer();

   var _this = this; 

    var timeout = setTimeout(function(){ 
      _this.getNames();
     }, 500);

    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg);

    });
 
    /*
    this.cookieService.set('MyNameCookie',this.globals.myName);
    this.cookieWithName = this.cookieService.get('MyNameCookie');
    this.monNamae = this.cookieWithName;
    */
  }
  //call this if you want to call a function from table
  //function names:
  //"set_start_table" / "" parameter
  //"set_debate_table" / "" parameter
  //"set_vote_table" / "" parameter
  //"set_ability_table" / "" parameter
  //"set_player_mayor" / "name of player you want to make mayor" parameter
  //"set_player_dead" / "name of player you want to be dead" parameter
  //"upvote_player" / "name of player you want to upvote" parameter
  event_function_table(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions({function_name:function_name,parameter:parameter});    
  } 



  // beginCountdown(){

  //   var timerCountDown = new this.timerClass();
    
  // }

  
  startTimer() {
    if(this.timerInitAvailable){
     this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        //this.timeLeft = 60;
        this.sendPlayerVotingInfo();
        this.pauseTimer();
        if (this.isDayTime){this.setPhase("NIGHT");}
        else{this.setPhase("DEBATE"); }
      }
      if(this.timeLeft>=10){document.getElementById("countdown").innerHTML="00:"+this.timeLeft.toString();}
      if(this.timeLeft<10){document.getElementById("countdown").innerHTML="00:0"+this.timeLeft.toString();}
      },1000)
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer(){

      this.timeLeft = 2;

  }
  
  




  openSidebar() {
    if(this.timerInitAvailable){console.log("Drawer Unavailable during countdown")}
    else{
      document.getElementById('mySidebar').style.display = 'block';
      document.getElementById('mySidebar').style.width = '100%';
      document.getElementById('mySidebar').style.backgroundColor = 'black';
    }
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
    this.SelectedPlayer = row;

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
    this.setPopUpTexts("DECLARE YOU ARE THE MAYOR!","YOUR VOTE WILL COUNT AS 2 AFTER DECLARATION")
    
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
  
  setTimerInitAvailable(v:boolean){
    this.timerInitAvailable = v;
  }



  setPopUpTexts(Top:string, Bottom:string){
    (<HTMLElement>document.getElementById('popupTopText')).innerHTML=Top;
    (<HTMLElement>document.getElementById('popupBottomText')).innerHTML=Bottom;
  }

  setPhaseTexts(Top:string, Bottom:string){
    (<HTMLElement>document.getElementById('phaseName')).innerHTML=Top;
    (<HTMLElement>document.getElementById('phaseDescription')).innerHTML=Bottom;
  }





  procceedToVote(){

    this.setPhase("VOTE");


  }









  setPhase(phase:string){

    if (phase == "DEBATE"){
        this.isDayTime = true;
        this.setPhaseTexts("DEBATE", "DISCUSS WITH OTHER PLAYERS")
        this.setPlayerSelectionAvailable(false);
        this.setTimerInitAvailable(false);
        (<HTMLElement>document.getElementById("countdown")).style.visibility = "hidden";
        (<HTMLElement>document.getElementById("masterPlayerContinueButton")).style.visibility = "visible";
        //(<HTMLElement>document.getElementById('playerRow')).style.opacity="0.5";
        //call this to ubdate the table
        //this.event_function_table("set_debate_table","");
    }

    this.resetTimer();

    if (phase == "VOTE"){
      this.setPhaseTexts("VOTE", "SELECT PLAYERS FOR ELIMINATION")
      this.setPlayerSelectionAvailable(true);
      this.setTimerInitAvailable(true);
      (<HTMLElement>document.getElementById("countdown")).style.visibility = "visible";
      (<HTMLElement>document.getElementById("masterPlayerContinueButton")).style.visibility = "hidden";
      this.startTimer();
      //(<HTMLElement>document.getElementById('playerRow')).style.opacity="1";
      //call this to ubdate the table
      ////this.event_function_table("set_vote_table","");
      
    }

    if (phase == "NIGHT"){

      this.isDayTime = false;
      this.setPhaseTexts("ABILITY NAME", "SELECT A PLAYER TO INVOKE YOUR ABILITY");
      this.startTimer();

    }

  }






  invokePopUp(topText: string, bottomText:string){

    this.setPopUpTexts(topText,bottomText);
    (<HTMLElement>document.getElementById('blurOverlay')).className="blur";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="visible";
    console.log("TOAST: "+topText+" "+bottomText);

  }
    
  getNames(){
    this.setNamesService.getNames().subscribe((data)=>{
      this.names = data["message"][0];
      this.avatars = data["message"][1];
      this.myName();
    });
  }
    
  sendPlayerVotingInfo(){
    console.log("hello");
    console.log(this.player);
    this.index = this.names.indexOf(this.SelectedPlayer);
    this.myindex = this.names.indexOf(this.player);
    this.event_function_table("upvote_player",this.SelectedPlayer);
    this.setNamesService.StoreVotes(this.index, this.myindex).subscribe((data)=>{
      console.log(data);
    });


  }  

  myName(){
    this.globals.myName = JSON.parse(localStorage.getItem('user'));
    this.monNamae=this.globals.myName;
    this.skipIndex = this.names.indexOf(this.monNamae);
    console.log("monnamae "+this.monNamae);
    console.log("skipindex "+this.skipIndex);
  }
    
    




  



}
