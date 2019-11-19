import { Globals } from './../global/globl';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'ami-fullstack-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss']

})
export class RoleInfoComponent implements OnInit {

  role: string;
  info: string;
  roleAvatar: string;

  constructor(public globals: Globals) {
    this.roleAvatar = 'https://i.imgur.com/TIk7nCa.png';
    // tslint:disable-next-line: max-line-length
    this.info = 'AS JACK THE RIPPER, YOU PLAY THE ROLE OF A LEGENDARY SERIAL KILLER TORMETING THE WHITECHAPEL DISTRICT OF LONDON.YOUR ABILITY, KILL, ALLOWS YOU TO SELECT ONE PLAYER EACH NIGHT FOR ELIMINATION. YOUR GOAL IS TO ELIMINATE ALL PLAYER WITHOUT THEM DISCOVERING YOU.';
  }

  ngOnInit() {
    this.role = this.globals.role;
  }

}
