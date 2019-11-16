import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'team13-Table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  Background: string;

  constructor() { 
    this.Background = 'C:/Users/anpat/Dropbox/HY469/Phase B/Whitechapel/fullstack-template/frontend/src/assets/table_background_night.png';
  }

  ngOnInit() {
    
  }

  change_background_day(){
    this.Background = 'C:/Users/anpat/Dropbox/HY469/Phase B/Whitechapel/fullstack-template/frontend/src/assets/table_background_day.png';
  }

  chang_background_night(){
    this.Background = 'C:/Users/anpat/Dropbox/HY469/Phase B/Whitechapel/fullstack-template/frontend/src/assets/table_background_night.png';
  }

}
