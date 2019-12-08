import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'team13-table-player6',
  templateUrl: './table-player6.component.html',
  styleUrls: ['./table-player6.component.scss']
})
export class TablePlayer6Component implements OnInit {
  player_image: string;
  player_mayor: string;
  player_dead: string;
  gibbet: string;
  player_name: string;
  pldead: boolean;
  num_vote: number;
  gibvis1: boolean;
  gibvis2: boolean;
  gibvis3: boolean;
  gibvis4: boolean;
  gibvis5: boolean;
  gibvis6: boolean;
  gibvis7: boolean;
  plm: boolean;
  constructor(private eventEmitterService: EventEmitterService) {
    this.player_image = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
    this.player_mayor = "https://i.imgur.com/OxNrceZ.png";
    this.gibbet = "https://www.svgrepo.com/show/585/gibbet.svg";
    this.player_name = "Andreas";
    this.num_vote = 0;
    this.gibvis1 = false;
    this.gibvis2 = false;
    this.gibvis3 = false;
    this.gibvis4 = false;
    this.gibvis5 = false;
    this.gibvis6 = false;
    this.gibvis7 = false;
    this.plm = true;
    //this.reset_giblet();
    
    this.player_dead = "https://i.imgur.com/vpqSnVP.png"
    this.pldead = false;
    this.upvote();
    this.upvote();
    this.upvote();
    this.upvote();
    this.upvote();
    this.upvote();
    this.upvote();
    
   }

  ngOnInit() {
    if (this.eventEmitterService.TablesubsVarpl6==undefined){
      this.eventEmitterService.TablesubsVarpl6 = this.eventEmitterService.    
      invokeTable_functions_player6.subscribe((data) => {
        if(data.function_name == "set_dead"){
          this.set_dead();
        }else if(data.function_name == "reset_giblet"){
          this.reset_giblet();
        }else if(data.function_name == "upvote"){
          this.upvote();
        }else if(data.function_name == "change_player_name"){
          this.change_player_name(data.parameter);
        }else if(data.function_name == "change_player_image"){
          this.change_player_image(data.parameter);
        }
      });
    }
  }

  set_visible_giblet(){

  }

  set_dead(){
    this.pldead = true;
  }

  set_mayor(){
    this.plm = true;
  }

  reset_mayor(){
    this.plm = false;
  }

  reset_giblet(){
    this.num_vote = 0;
    this.gibvis1 = false;
    this.gibvis2 = false;
    this.gibvis3 = false;
    this.gibvis4 = false;
    this.gibvis5 = false;
    this.gibvis6 = false;
    this.gibvis7 = false;
  }

  change_player_name(name: string){
    this.player_name = name;
  }

  change_player_image(image: string){
    this.player_image = image;
  }
  
  upvote(){
    this.num_vote++;
    if (this.num_vote > 0 && this.num_vote <=7){
      if(this.num_vote == 1){
        this.gibvis1 = true;
        this.gibvis2 = false;
        this.gibvis3 = false;
        this.gibvis4 = false;
        this.gibvis5 = false;
        this.gibvis6 = false;
        this.gibvis7 = false;
      }else if(this.num_vote == 2){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = false;
        this.gibvis4 = false;
        this.gibvis5 = false;
        this.gibvis6 = false;
        this.gibvis7 = false;
      }else if(this.num_vote == 3){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = true;
        this.gibvis4 = false;
        this.gibvis5 = false;
        this.gibvis6 = false;
        this.gibvis7 = false;
      }else if(this.num_vote == 4){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = true;
        this.gibvis4 = true;
        this.gibvis5 = false;
        this.gibvis6 = false;
        this.gibvis7 = false;
      }else if(this.num_vote == 5){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = true;
        this.gibvis4 = true;
        this.gibvis5 = true;
        this.gibvis6 = false;
        this.gibvis7 = false;
      }else if(this.num_vote == 6){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = true;
        this.gibvis4 = true;
        this.gibvis5 = true;
        this.gibvis6 = true;
        this.gibvis7 = false;
      }else if(this.num_vote == 7){
        this.gibvis1 = true;
        this.gibvis2 = true;
        this.gibvis3 = true;
        this.gibvis4 = true;
        this.gibvis5 = true;
        this.gibvis6 = true;
        this.gibvis7 = true;
      }
    }else{
      this.num_vote = 0;
      this.gibvis1 = false;
      this.gibvis2 = false;
      this.gibvis3 = false;
      this.gibvis4 = false;
      this.gibvis5 = false;
      this.gibvis6 = false;
      this.gibvis7 = false;
    }
  }
}
