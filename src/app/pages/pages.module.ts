import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    RoomsComponent,
    NoPageFoundComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
