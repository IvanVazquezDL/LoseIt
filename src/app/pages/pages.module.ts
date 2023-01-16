import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeightTrackingComponent } from './weight-tracking/weight-tracking.component';
import { CreateRoomComponent } from './create-room/create-room.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    RoomsComponent,
    NoPageFoundComponent,
    PagesComponent,
    WeightTrackingComponent,
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
