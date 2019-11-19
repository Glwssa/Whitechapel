import { Component, OnInit } from '@angular/core';
import { TablePlayerComponent } from '../table-player';
import { TablePlayer2Component } from '../table-player2';
import { TablePlayer3Component } from '../table-player3';
import { TablePlayer4Component } from '../table-player4';

let TablePlayerComponentObject = new TablePlayerComponent();
let TablePlayer2ComponentObject = new TablePlayer2Component();
let TablePlayer3ComponentObject = new TablePlayer3Component();
let TablePlayer4ComponentObject = new TablePlayer4Component();

@Component({
  selector: 'team13-Table',
  providers:[TablePlayerComponent,TablePlayer2Component,TablePlayer3Component,TablePlayer4Component],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  Background: string;
  game_title_vis: boolean;
  player1: boolean;
  title: string;
  titlevis: boolean;

  constructor() { 
    this.Background = 'https://i.imgur.com/UwNfp80.png';
    this.title = "DEBATE"
    this.titlevis = true;
    this.game_title_vis = false;
    this.player1 = true;
    
    //this.change_title("ABILITY USE")
    //this.chang_background_night();
    //this.setup_table();
    //reset_giblets();
    
  }

  ngOnInit() {
    
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
  
  setup_table(){
    this.titlevis = true;
    this.game_title_vis = false;
    this.player1 = true;
    this.change_background_day()
  }

}
