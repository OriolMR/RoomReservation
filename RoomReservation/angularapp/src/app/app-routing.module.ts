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
import { ReservesAdminComponent } from './views/admin/reserves-admin/reserves-admin.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: false } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: false } },
  { path: 'reserves', component: ReservesComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: false } },
  { path: 'reservation', component: ReservationComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: false } },
  

  // Acceso solo para usuarios autenticados con el rol de "Administrador"
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-cities', component: CitiesComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-countries', component: CountriesComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-offices', component: officesComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-rooms', component: MeetingRoomsComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-users', component: UsersComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: 'admin/admin-reserves', component: ReservesAdminComponent, canActivate: [AuthenticationGuard], data: { requireAdmin: true } },
  { path: '**', component: PageNotFoundComponent }
 
  // Otras rutas a definir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
