//import { CookieService } from 'ngx-cookie-service';
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
  roles = ['CONSTABLE', 'JESTER', 'VIGILANTE', 'MAYOR', 'MEDIUM', 'JACK THE REAPER', 'PHYSICIAN'];
  
  role: string;
  public PlayerRole: string = "lol";
  public index_of_player: number = 0;
  currentRole: string;
  mayorDeclaration: boolean;
  playerSelectionAvailable: Boolean;
  timerInitAvailable: Boolean;
  isDayTime: Boolean;
  isFirstDay: Boolean;
  SelectedPlayer: string;
  public myUserID;
  public userIDToTreat;
  public msg;
  public socketEvents: {event: string, message: any}[];
  public playerStateURL;
  response: any;
  index: number;
  myindex: number;
  public playersRole: string[];

  buttonHalt:boolean;
  monNamae: string;
  skipIndex: number;
  cookieWithName: string;

  timeLeft: number = 3;
  interval;



  roleIcons = ["https://i.imgur.com/9LzwD2L.png",
    "https://i.imgur.com/Hl9HvHp.png",
    "https://i.imgur.com/VZVnvpp.png",
    "https://i.imgur.com/W3WK2IQ.png",
    "https://i.imgur.com/vth8OLN.png",
    "https://i.imgur.com/cIwiHJe.png",
    "https://i.imgur.com/yb3YgnB.png"]

  roleIconsCores = ["Constable","Jester","Vigilante","Mayor","Medium","Jack the Reaper", "Physician"]
  roleAbilitiesCors = ["INVESTIGATION", "NIGHTWALK","EXECUTE","NO NIGHT TIME ABILITY", "KILL", "HEAL"]
  myRole: string;
  bg: string;

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






  constructor( public globals: Globals, private setNamesService : SetNamesService, private socketService: SocketsService,private eventEmitterService: EventEmitterService) {
    this.prevRow = '';
    this.player = "lala";
    this.role = this.roles[0];
    this.mayorDeclaration = false;
    this.playerSelectionAvailable = true;
    this.timerInitAvailable = false;
    this.isDayTime = true;
    this.buttonHalt = false;
    this.isFirstDay = true;

    
    
  }

  ngOnInit() {
    document.getElementById('mySidebar').style.display = 'none';
    var retrievedObject = localStorage.getItem('user');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    this.closeMayorPanel();
    
    


    this.setPhase("DEBATE");

   // this.invokePopUp("I USE THIS", "TO SEND TOASTS");
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
        if(this.isDayTime){this.sendPlayerVotingInfo();}
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

      this.timeLeft = 6;

  }
  
  




  openSidebar() {
    if(this.timerInitAvailable || this.buttonHalt){console.log("Drawer Unavailable")}
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
        this.player = row;
      } else {
        document.getElementById(row).style.backgroundColor = 'black';
        this.player = row;
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
    if (!this.buttonHalt){
     this.buttonHalt = true;
      (<HTMLElement>document.getElementById('popupMayor')).style.visibility="visible";
      (<HTMLElement>document.getElementById('popupSmall')).style.visibility="visible";
      (<HTMLElement>document.getElementById('blurOverlay')).className="blur";
      this.setPopUpTexts("DECLARE YOU ARE THE MAYOR!","YOUR VOTE WILL COUNT AS 2 AFTER DECLARATION")
    
     console.log("Mayor Panel activated");
    }

  }

  closeMayorPanel(){
    
    (<HTMLElement>document.getElementById('popupMayor')).style.visibility="hidden";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="hidden";
    (<HTMLElement>document.getElementById('blurOverlay')).className="noblur";
  
    this.buttonHalt = false;
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
    if(this.isFirstDay && !this.buttonHalt){this.timerInitAvailable=true; this.setPlayerSelectionAvailable(true); this.setPhase("NIGHT");}
    else{ if(!this.buttonHalt){this.setPhase("VOTE");}}


  }









  setPhase(phase:string){

    //background-attachment: fixed;
  
  //	background-repeat: no-repeat;


    (<HTMLElement>document.body).style.backgroundRepeat="no-repeat";

    if (phase == "DEBATE"){
      this.bg = 'url(https://i.imgur.com/hlt0zgH.png)';
        this.isDayTime = true;
      //  (<HTMLElement>document.body).style.backgroundImage = "https://i.imgur.com/DpTwcFZ.jpg";

        this.setPhaseTexts("DEBATE", "DISCUSS WITH OTHER PLAYERS")
        this.setPlayerSelectionAvailable(false);
        this.setTimerInitAvailable(false);
        (<HTMLElement>document.getElementById("countdown")).style.visibility = "hidden";
        (<HTMLElement>document.getElementById("masterPlayerContinueButton")).style.visibility = "visible";
        this.event_function_table("set_debate_table","");
        //(<HTMLElement>document.getElementById('playerRow')).style.opacity="0.5";
        //call this to ubdate the table
        this.event_function_table("set_debate_table","");
    }

    this.resetTimer();

    if (phase == "VOTE"){
      this.setPhaseTexts("VOTE", "SELECT PLAYERS FOR ELIMINATION")
      this.setPlayerSelectionAvailable(true);
      this.setTimerInitAvailable(true);
      (<HTMLElement>document.getElementById("countdown")).style.visibility = "visible";
      (<HTMLElement>document.getElementById("masterPlayerContinueButton")).style.visibility = "hidden";
      this.event_function_table("set_vote_table","");
      this.startTimer();
      //(<HTMLElement>document.getElementById('playerRow')).style.opacity="1";
      //call this to ubdate the table
      //this.event_function_table("set_vote_table","");
      
      
    }

    if (phase == "NIGHT"){

      this.isDayTime = false;
      this.isFirstDay = false;
      
      this.bg = 'url(https://i.imgur.com/YAj9ddJ.png)';

      (<HTMLElement>document.getElementById("countdown")).style.visibility = "visible";
      (<HTMLElement>document.getElementById("masterPlayerContinueButton")).style.visibility = "hidden";

      var ab = this.roleIconsCores.indexOf(this.playersRole[this.skipIndex]);

      if(this.roleIconsCores[ab]!="Mayor"){
        if(this.roleIconsCores[ab]!="Medium"){
          this.setPhaseTexts(this.roleAbilitiesCors[ab], "SELECT A PLAYER TO INVOKE YOUR ABILITY");
        }
        else{
          this.setPhaseTexts(this.roleAbilitiesCors[ab], "DECEASED PLAYERS MAY INVOKE YOUR ABILITY");
        }
      }
      else{
        this.setPhaseTexts(this.roleAbilitiesCors[ab], "DECLARE ROLE DURING DEBATE");
      }
      this.event_function_table("set_ability_table","");
      console.log("y0");
      this.startTimer();


    }

  }






  invokePopUp(topText: string, bottomText:string){
    this.buttonHalt = true;
    this.setPopUpTexts(topText,bottomText);
    (<HTMLElement>document.getElementById('blurOverlay')).className="blur";
    (<HTMLElement>document.getElementById('popupSmall')).style.visibility="visible";
    console.log("TOAST: "+topText+" "+bottomText);

  }
    
  getNames(){
    
    this.setNamesService.getNames().subscribe((data)=>{
      
      this.names = data["message"][0];
      this.avatars = data["message"][1];
      this.playersRole = data["message"][2];
      console.log(this.playersRole);

      //console.log(this.names);
      //this.find_player_role_by_name();
      //console.log(this.names);
      //this.PlayerRole = localStorage.getItem("PlayerRole");
      this.myName();
      
    });
  }
  //should find index of player inside names and give PlayerRole the correct role but indexof is fucked!!!!!!!!
  find_player_role_by_name(){
    var pl_name = localStorage.getItem("user");
    //console.log(typeof pl_name);
    //console.log(pl_name);
    //console.log(this.names);
    //console.log(typeof this.names.lastIndexOf(pl_name));
    //this.index_of_player = this.names.lastIndexOf(pl_name);
    
    this.skipIndex = this.names.indexOf(pl_name);
    //console.log(this.skipIndex);
    this.PlayerRole = this.playersRole[this.skipIndex];
    
    
   // localStorage.setItem("PlayerRole", this.playersRole[index]);
  }
    
  sendPlayerVotingInfo(){
    this.event_function_table("upvote", this.SelectedPlayer);
    console.log("helloEIMAI SEXY");
    this.index = this.names.indexOf(this.SelectedPlayer);

    this.myindex = this.names.indexOf(this.monNamae);

    this.event_function_table("upvote_player",this.SelectedPlayer);
    this.setNamesService.StoreVotes(this.index, this.myindex).subscribe((data)=>{
      console.log(data);
      this.event_function_table("set_dead_player", this.names[data["message"]]);
    });


  }  

  myName(){
    this.globals.myName = JSON.parse(localStorage.getItem('user'));
    this.monNamae=this.globals.myName;
    this.skipIndex = this.names.indexOf(this.monNamae);
    var gamw = this.roleIconsCores.indexOf(this.playersRole[this.skipIndex]);
    this.myRole = this.roleIcons[gamw];

    
    if(this.roleIconsCores[gamw]!="Mayor"){(<HTMLElement>document.getElementById('fab')).style.visibility="hidden";}


    console.log("monnamae "+this.monNamae);
    console.log("skipindex "+this.skipIndex);
  }
    
    




  



}
