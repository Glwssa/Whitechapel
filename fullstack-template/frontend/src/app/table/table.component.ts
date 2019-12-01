import { Component, OnInit } from '@angular/core';
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

  constructor(private eventEmitterService: EventEmitterService ) { 
    
    this.Background = 'https://i.imgur.com/UwNfp80.png';
    this.title = "DEBATE"
    this.titlevis = true;
    this.game_title_vis = false;
    this.players = true;
    //TablePlayerComponentObject.pldead = true;
    //this.change_title("ABILITY USE")
    //this.chang_background_night();
    //this.setup_table();
    this.reset_giblets();
    
  }

  ngOnInit() {
    
  }

  child_event_function_player1(function_name: string, parameter: string){    
    this.eventEmitterService.Table_functions_player1({function_name,parameter});    
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
  
  setup_table(){
    this.titlevis = true;
    this.game_title_vis = false;
    this.players = true;
    this.change_background_day();
    //TablePlayerComponentObject.change_player_name("Ανδρεας");
    //TablePlayer2ComponentObject.change_player_name("Σπυρος");
    //TablePlayer3ComponentObject.change_player_name("Νατασα");
    //TablePlayer4ComponentObject.change_player_name("Πανος");
    //TablePlayer5ComponentObject.change_player_name("Ελενη");
    //TablePlayer6ComponentObject.change_player_name("Στρατος");
    //TablePlayer7ComponentObject.change_player_name("Νικι");
    this.reset_giblets();
    this.change_title_debate();
  }

  reset_giblets(){
    this.child_event_function_player1("reset_giblet", "");
    //TablePlayerComponentObject.reset_giblet();
    //TablePlayer2ComponentObject.reset_giblet();
    //TablePlayer3ComponentObject.reset_giblet();
    //TablePlayer4ComponentObject.reset_giblet();
    //TablePlayer5ComponentObject.reset_giblet();
    //TablePlayer6ComponentObject.reset_giblet();
    //TablePlayer7ComponentObject.reset_giblet();
  }

}
