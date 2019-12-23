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
import { TablePlayer5Component } from './table-player5/table-player5.component';
import { TablePlayer6Component } from './table-player6/table-player6.component';
import { TablePlayer7Component } from './table-player7/table-player7.component';
import { EventEmitterService } from './event-emitter.service';
import { MobileLoginComponent } from './mobilelogin/mobile-login.component';
import { VirtualComponent } from './cursor/virtual/virtual.component';
//import { CookieService } from 'ngx-cookie-service';
import { VideoWallComponent } from './video-wall/video-wall.component';

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
    TablePlayer5Component,
    TablePlayer6Component,
    TablePlayer7Component,
    MobileLoginComponent,
    VirtualComponent,
    VideoWallComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
   // BrowserAnimationsModule
  ],
  providers: [ Globals,EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
