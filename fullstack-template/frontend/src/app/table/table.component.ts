import { Component, OnInit } from '@angular/core';
import { TablePlayerComponent } from '../table-player';

let TablePlayerComponentObject = new TablePlayerComponent();

@Component({
  selector: 'team13-Table',
  providers:[TablePlayerComponent],
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
    this.titlevis = false;
    this.game_title_vis = true;
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
