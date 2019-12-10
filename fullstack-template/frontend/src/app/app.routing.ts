import { RoleInfoComponent } from './role-info/role-info.component';
import { MobileComponent } from './mobile/mobile.component';
import { MobileLoginComponent } from './mobilelogin/mobile-login.component';
import { TvComponent } from './tv/tv.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TablePlayerComponent } from './table-player/table-player.component';
import { TablePlayer2Component } from './table-player2/table-player2.component';
import { TablePlayer3Component } from './table-player3/table-player3.component';
import { TablePlayer4Component } from './table-player4/table-player4.component';
import { TablePlayer5Component } from './table-player5/table-player5.component';
import { TablePlayer6Component } from './table-player6/table-player6.component';
import { TablePlayer7Component } from './table-player7/table-player7.component';
import { VirtualComponent } from './cursor/virtual/virtual.component';


const routes: Routes = [
  {path: 'testC', component: VirtualComponent},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'table', component: TableComponent },
  { path: 'table-player', component: TablePlayerComponent },
  { path: 'tv', component: TvComponent },
  { path: 'mobile', component: MobileLoginComponent},
  { path: 'mobileMain', component: MobileComponent},
  { path: 'role-info', component: RoleInfoComponent},
  { path: 'backToRoleInfoList', component: RoleInfoComponent},
  
  { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
