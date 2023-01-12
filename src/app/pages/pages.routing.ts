import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
    {
        path:'',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'rooms', component: RoomsComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
