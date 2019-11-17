import { MobileComponent } from './mobile/mobile.component';
import { TvComponent } from './tv/tv.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TablePlayerComponent } from './table-player/table-player.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'table', component: TableComponent },
  { path: 'table-player', component: TablePlayerComponent },
  { path: 'tv', component: TvComponent },
  { path: 'mobile', component: MobileComponent},
  { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
