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
import { CountriesComponent } from './views/admin/countries/countries.component';
import { officesComponent } from './views/admin/offices/offices.component';
import { MeetingRoomsComponent } from './views/admin/meeting-rooms/meeting-rooms.component';
import { UsersComponent } from './views/admin/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent}, 
  { path: 'profile', component: ProfileComponent}, 
  { path: 'reserves', component: ReservesComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'admin/admin-cities', component: CitiesComponent },
  { path: 'admin/admin-countries', component: CountriesComponent },
  { path: 'admin/admin-offices', component: officesComponent },
  { path: 'admin/admin-rooms', component: MeetingRoomsComponent },
  { path: 'admin/admin-users', component: UsersComponent },
  { path:'**', component: PageNotFoundComponent }
  // Otras rutas a definir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
