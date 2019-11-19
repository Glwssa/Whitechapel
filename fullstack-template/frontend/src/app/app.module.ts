import { Globals } from './global/globl';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { TableComponent } from './table/table.component';
import { TvComponent } from './tv/tv.component';
import { TablePlayerComponent } from './table-player/table-player.component';
import { MobileComponent } from './mobile/mobile.component';
import { RoleInfoComponent } from './role-info/role-info.component';
import { TablePlayer2Component } from './table-player2/table-player2.component';
import { TablePlayer3Component } from './table-player3/table-player3.component';
import { TablePlayer4Component } from './table-player4/table-player4.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TvComponent,
    TablePlayerComponent,
    MobileComponent,
    RoleInfoComponent,
    TablePlayer2Component,
    TablePlayer3Component,
    TablePlayer4Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
   // BrowserAnimationsModule
  ],
  providers: [ Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
