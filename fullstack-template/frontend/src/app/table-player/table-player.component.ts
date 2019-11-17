import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team13-table-player',
  templateUrl: './table-player.component.html',
  styleUrls: ['./table-player.component.scss']
})
export class TablePlayerComponent implements OnInit {
  player_image: string;
  player_dead: string;
  gibbet: string;
  player_name: string;
  pldead: boolean;
  gibvis1: boolean;
  gibvis2: boolean;
  gibvis3: boolean;
  gibvis4: boolean;
  gibvis5: boolean;
  gibvis6: boolean;
  gibvis7: boolean;
  constructor() {
    this.player_image = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
    this.gibbet = "https://www.svgrepo.com/show/585/gibbet.svg";
    this.player_name = "Andreas";
    this.gibvis1 = true;
    this.gibvis2 = true;
    this.gibvis3 = true;
    this.gibvis4 = true;
    this.gibvis5 = true;
    this.gibvis6 = true;
    this.gibvis7 = true;
    this.player_dead = "https://i.imgur.com/vpqSnVP.png"
    this.pldead = false;
  }

  ngOnInit() {
  }

  set_visible_giblet(){

  }

  set_dead(){
    this.pldead = true;
  }

  reset_giblet(){
    this.gibvis1 = false;
    this.gibvis2 = false;
    this.gibvis3 = false;
    this.gibvis4 = false;
    this.gibvis5 = false;
    this.gibvis6 = false;
    this.gibvis7 = false;
  }
}
