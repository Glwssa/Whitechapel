import { Globals } from './../global/globl';
import { Component, OnInit, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {

  prevRow: string;
  names = ['Stratos', 'Kostas', 'Natasa', 'Andreas', 'Panos', 'Giannis', 'Ete'];
  player: string;
  roles = ['JACK THE REAPER', 'CONSTABLE', 'PHYSICIAN' , 'MEDIUM', 'JOKER', 'VIGILANTE', 'MAYOR'];
  role: string;
  currentRole: string;

  constructor(public globals: Globals) {
    this.prevRow = '';
    this.player = this.names[2];
    this.role = this.roles[0];
   }

  ngOnInit() {
    document.getElementById('mySidebar').style.display = 'none';
  }

  openSidebar() {
    document.getElementById('mySidebar').style.display = 'block';
    document.getElementById('mySidebar').style.width = '100%';
    document.getElementById('mySidebar').style.backgroundColor = 'black';
  }

  rowSelect(row: string) {


    if (this.prevRow !== row) {
      console.log('row: ' + row);
      console.log('prevRow: ' + this.prevRow);
      if ( !this.prevRow) {
        this.prevRow = row;
        document.getElementById(row).style.backgroundColor = 'black';
      } else {
        document.getElementById(row).style.backgroundColor = 'black';
        document.getElementById(this.prevRow).style.backgroundColor = 'transparent';
        this.prevRow = row;
      }


    }

  }

  closeSidebar() {
    document.getElementById('mySidebar').style.display = 'none';
  }

  setCurrentRole(role: string) {
    this.currentRole = role;
    console.log('current role :' + this.currentRole);
    this.globals.role = this.currentRole;
  }
}
