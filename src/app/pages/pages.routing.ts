import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { WeightTrackingComponent } from './weight-tracking/weight-tracking.component';

const routes: Routes = [
    {
        path:'',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'rooms', component: RoomsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'weight-tracking', component: WeightTrackingComponent }
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
