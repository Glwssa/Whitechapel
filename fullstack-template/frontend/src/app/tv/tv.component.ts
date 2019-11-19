import { Component, OnInit, } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { style } from '@angular/animations';
import { DirectiveNormalizer } from '@angular/compiler';


@Component({
  selector: 'ami-fullstack-tv',
 /* animations: [
    trigger('transition', [
      // ...
      state('start'),
      state('finish'),
      transition('start => finish', [
        animate('1s')
      ]),
      transition('finish => start', [
        animate('1s')
      ]),
    ]),
  ],*/
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  image: string;
  round: number;
  flag: boolean;
  norm: string;
  grey: string;
  arrow: string;
  dead: boolean;
  name: string;

  constructor() {
    this.image = 'https://i.imgur.com/TIk7nCa.png';
    this.arrow = 'https://i.imgur.com/LxivwLt.png';
    this.round = 1;
    this.flag = false;
    this.norm = 'saturate(1)';
    this.grey = 'saturate(0)';
    this.dead = true;
    this.name = 'Strataras';
   }




  ngOnInit() {
  }

  increment() {
    ++this.round;
  }
  deincrement() {
    --this.round;
  }

  satur() {
    this.flag = true;
    this.dead = false;
  }

}


