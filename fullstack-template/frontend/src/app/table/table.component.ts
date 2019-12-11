import { Component, OnInit } from '@angular/core';
import {TableService} from './../table.service';
import { SocketsService } from 'src/app/global/services';
import { EventEmitterService } from '../event-emitter.service'; 
import { TablePlayerComponent } from '../table-player/table-player.component';
import { TablePlayer2Component } from '../table-player2/table-player2.component';
import { TablePlayer3Component } from '../table-player3/table-player3.component';
import { TablePlayer4Component } from '../table-player4/table-player4.component';
import { TablePlayer5Component } from '../table-player5/table-player5.component';
import { TablePlayer6Component } from '../table-player6/table-player6.component';
import { TablePlayer7Component } from '../table-player7/table-player7.component';

//let TablePlayerComponentObject = new TablePlayerComponent();
//let TablePlayer2ComponentObject = new TablePlayer2Component();
//let TablePlayer3ComponentObject = new TablePlayer3Component();
//let TablePlayer4ComponentObject = new TablePlayer4Component();
//let TablePlayer5ComponentObject = new TablePlayer5Component();
//let TablePlayer6ComponentObject = new TablePlayer6Component();
//let TablePlayer7ComponentObject = new TablePlayer7Component();

@Component({
  selector: 'team13-Table',
  providers:[TablePlayerComponent,TablePlayer2Component,TablePlayer3Component,TablePlayer4Component,TablePlayer5Component],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  Background: string;
  game_title_vis: boolean;
  players: boolean;
  title: string;
  titlevis: boolean;
  player_active: number;
  msg: any;
  TablePlayerNamesImagesCharacters: string[][];
  public socketEvents: {event: string, message: any}[];
  startSetup: boolean;

  
  constructor(private tableService: TableService, private socketService: SocketsService, private eventEmitterService: EventEmitterService ) { 
    this.socketEvents = [];
    
    this.Background = 'https://i.imgur.com/UwNfp80.png';
    this.title = "DEBATE"
    this.titlevis = false;
    this.game_title_vis = true;
    this.players = false;
    this.player_active = 0;
    //this.TablePlayerNamesImagesCharacters = [];
    this.chang_background_night();
    //this.reset_giblets();
    //this.reset_mayor();
    //this.set_start_table();

    
    //this.change_title("ABILITY USE")
    //this.chang_background_night();
    //this.setup_table();
    //this.reset_giblets();
    
  }

  ngOnInit() {
    
    this.socketService.syncMessages('screaming').subscribe(msg => {
      this.socketEvents.push(this.msg);

    });
    /*var _this = this
    setInterval(function(){ 
      console.log("Interval");
      //this.getTableStartBool();

    }, 3000);
    setTimeout(function(){ 
      //this.getTableStartBool();
     }, 3000);
    */
    


    //function strings for players:
    //set_dead no parameter
    //reset_giblet no parameter
    //upvote no parameter
    //change_player_name with parameter
    //change_player_image with parameter
    //set_mayor
    //reset_mayor
  }


  getDataforSetup(){
    this.tableService.getTableNames(this.msg, "").subscribe((data)=>{
      //console.log(data["message"]);
      this.TablePlayerNamesImagesCharacters = data["message"];
      this.setup_table();
      //this.set_start_table();
    });
  }

  getTableStartBool(){
    this.tableService.getTableStartBool().subscribe((data)=>{
      //this.startSetup = data.message;
      console.log(data);
    });
  }


  child_event_function_player1(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player1({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player2(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player2({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player3(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player3({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player4(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player4({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player5(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player5({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player6(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player6({function_name:function_name,parameter:parameter});    
  } 
  child_event_function_player7(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player7({function_name:function_name,parameter:parameter});    
  } 


  change_background_day(){
    this.Background = 'https://i.imgur.com/UwNfp80.png';
  }

  chang_background_night(){
    this.Background = 'https://i.imgur.com/fKYhJzQ.png';
  }
  
  change_title(title: string){
    this.title = title;
  }

  change_title_debate(){
    this.title = "DEBATE";
  }

  change_title_vote(){
    this.title = "VOTE";
  }

  change_title_ability(){
    this.title = "ABILITY USE";
  }
  
  set_start_table(){
    this.chang_background_night();
    this.titlevis = false;
    this.game_title_vis= true;
    this.players = false;
    this.reset_mayor();
    this.reset_giblets();
  }
  
  set_debate_table(){
    this.reset_giblets();
    this.change_background_day();
    this.change_title_debate();
  }

  set_vote_table(){
    this.reset_giblets();
    this.change_background_day();
    this.change_title_vote();
  }

  set_ability_table(){
    this.reset_giblets();
    this.chang_background_night();
    this.change_title_ability();
  }

  set_player_mayor(){
    //need to pul player number from jason
    if(this.player_active == 1){
      this.child_event_function_player1("set_mayor","");
    }else if(this.player_active == 2){
      this.child_event_function_player2("set_mayor","");
    }else if(this.player_active == 3){
      this.child_event_function_player3("set_mayor","");
    }else if(this.player_active == 4){
      this.child_event_function_player4("set_mayor","");
    }else if(this.player_active == 5){
      this.child_event_function_player5("set_mayor","");
    }else if(this.player_active == 6){
      this.child_event_function_player6("set_mayor","");
    }else if(this.player_active == 7){
      this.child_event_function_player7("set_mayor","");
    }
  }

  reset_mayor(){
    this.child_event_function_player1("reset_mayor","");
    this.child_event_function_player2("reset_mayor","");
    this.child_event_function_player3("reset_mayor","");
    this.child_event_function_player4("reset_mayor","");
    this.child_event_function_player5("reset_mayor","");
    this.child_event_function_player6("reset_mayor","");
    this.child_event_function_player7("reset_mayor","");
  }

  set_player_dead(){
    //need to pul player number from jason
    if(this.player_active == 1){
      this.child_event_function_player1("reset_giblet", "");
      this.child_event_function_player1("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player1("change_player_image", "");
    }else if(this.player_active == 2){
      this.child_event_function_player2("reset_giblet", "");
      this.child_event_function_player2("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player2("change_player_image", "");
    }else if(this.player_active == 3){
      this.child_event_function_player3("reset_giblet", "");
      this.child_event_function_player3("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player3("change_player_image", "");
    }else if(this.player_active == 4){
      this.child_event_function_player4("reset_giblet", "");
      this.child_event_function_player4("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player4("change_player_image", "");
    }else if(this.player_active == 5){
      this.child_event_function_player5("reset_giblet", "");
      this.child_event_function_player5("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player5("change_player_image", "");
    }else if(this.player_active == 6){
      this.child_event_function_player6("reset_giblet", "");
      this.child_event_function_player6("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player6("change_player_image", "");
    }else if(this.player_active == 7){
      this.child_event_function_player7("reset_giblet", "");
      this.child_event_function_player7("set_dead", "");
      //needs to pull player character image from jason
      //this.child_event_function_player7("change_player_image", "");
    }
  }

  upvote_player(){
    //need to pull player number from jason
    if(this.player_active == 1){
      this.child_event_function_player1("upvote", "");
    }else if(this.player_active == 2){
      this.child_event_function_player2("upvote", "");
    }else if(this.player_active == 3){
      this.child_event_function_player3("upvote", "");
    }else if(this.player_active == 4){
      this.child_event_function_player4("upvote", "");
    }else if(this.player_active == 5){
      this.child_event_function_player5("upvote", "");
    }else if(this.player_active == 6){
      this.child_event_function_player6("upvote", "");
    }else if(this.player_active == 7){
      this.child_event_function_player7("upvote", "");
    }
  }

  setup_table(){
    this.titlevis = true;
    this.game_title_vis = false;
    this.players = true;
    this.change_background_day();
    //needs to put data from jason to change names
    this.child_event_function_player1("change_player_name", this.TablePlayerNamesImagesCharacters[0][0]);
    this.child_event_function_player2("change_player_name", this.TablePlayerNamesImagesCharacters[1][0]);
    this.child_event_function_player3("change_player_name", this.TablePlayerNamesImagesCharacters[2][0]);
    this.child_event_function_player4("change_player_name", this.TablePlayerNamesImagesCharacters[3][0]);
    this.child_event_function_player5("change_player_name", this.TablePlayerNamesImagesCharacters[4][0]);
    this.child_event_function_player6("change_player_name", this.TablePlayerNamesImagesCharacters[5][0]);
    this.child_event_function_player7("change_player_name", this.TablePlayerNamesImagesCharacters[6][0]);
    //need to pull data from jason to change images
    this.child_event_function_player1("change_player_image", this.TablePlayerNamesImagesCharacters[0][1]);
    this.child_event_function_player2("change_player_image", this.TablePlayerNamesImagesCharacters[1][1]);
    this.child_event_function_player3("change_player_image", this.TablePlayerNamesImagesCharacters[2][1]);
    this.child_event_function_player4("change_player_image", this.TablePlayerNamesImagesCharacters[3][1]);
    this.child_event_function_player5("change_player_image", this.TablePlayerNamesImagesCharacters[4][1]);
    this.child_event_function_player6("change_player_image", this.TablePlayerNamesImagesCharacters[5][1]);
    this.child_event_function_player7("change_player_image", this.TablePlayerNamesImagesCharacters[6][1]);
    this.reset_giblets();
    this.reset_mayor();
    this.change_title_debate();
  }

  reset_giblets(){
    this.child_event_function_player1("reset_giblet", "");
    this.child_event_function_player2("reset_giblet", "");
    this.child_event_function_player3("reset_giblet", "");
    this.child_event_function_player4("reset_giblet", "");
    this.child_event_function_player5("reset_giblet", "");
    this.child_event_function_player6("reset_giblet", "");
    this.child_event_function_player7("reset_giblet", "");
  }

}
