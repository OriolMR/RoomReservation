import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ReservesComponent } from './views/reserves/reserves.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { AuthenticationGuard } from './views/login/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la ruta de login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] }, // Protege la ruta "home" con el guardia de autenticación
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] }, // Protege la ruta "profile" con el guardia de autenticación
  { path: 'reserves', component: ReservesComponent},
  { path: 'reservation', component: ReservationComponent },
  // Otras rutas a definir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
