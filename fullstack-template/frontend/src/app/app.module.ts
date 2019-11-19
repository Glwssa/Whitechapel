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

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TvComponent,
    TablePlayerComponent,
    MobileComponent,
    RoleInfoComponent,
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
