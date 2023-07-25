import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ReservesComponent } from './views/reserves/reserves.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { AdminComponent } from './views/admin/admin.component';
import { AuthenticationGuard } from './views/login/authentication.guard';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CitiesComponent } from './views/admin/cities/cities.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent,canActivate: [AuthenticationGuard]}, 
  { path: 'profile', component: ProfileComponent,canActivate: [AuthenticationGuard]}, 
  { path: 'reserves', component: ReservesComponent,canActivate: [AuthenticationGuard]},
  { path: 'admin', component: AdminComponent },
  { path: 'reservation', component: ReservationComponent,canActivate: [AuthenticationGuard]},
  { path: 'admin-cities', component: CitiesComponent },
  { path:'**', component: PageNotFoundComponent }
  // Otras rutas a definir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
