import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team13-table-player',
  templateUrl: './table-player.component.html',
  styleUrls: ['./table-player.component.scss']
})
export class TablePlayerComponent implements OnInit {
  player_image: string;
  gibbet: string;
  player_name: string;
  constructor() {
    this.player_image = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
    this.gibbet = "https://www.svgrepo.com/show/585/gibbet.svg";
    this.player_name = "Andreas";
   }

  ngOnInit() {
  }

}
