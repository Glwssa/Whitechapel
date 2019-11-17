import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'team13-Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  Background: string;

  constructor() { 
    this.Background = 'https://i.imgur.com/UwNfp80.png';
  }

  ngOnInit() {
    
  }

  change_background_day(){
    this.Background = 'https://i.imgur.com/UwNfp80.png';
  }

  chang_background_night(){
    this.Background = 'https://i.imgur.com/fKYhJzQ.png';
  }

}
