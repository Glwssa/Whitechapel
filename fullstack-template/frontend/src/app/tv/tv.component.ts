import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],

})
export class TvComponent implements OnInit {
  image: string;
  round: number;

  constructor() {
    this.image = 'https://www.w3schools.com/images/w3schools_green.jpg';
    this.round = 1;
   }


  ngOnInit() {
  }

  increment() {
    ++this.round;
  }
  deincrement() {
    --this.round;
  }
}


