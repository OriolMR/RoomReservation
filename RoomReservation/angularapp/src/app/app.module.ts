import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { EntradaComponent } from './views/home/entrada/entrada.component';
import { ReservesComponent } from './views/reserves/reserves.component';
import { EntradaReservesComponent } from './views/reserves/entrada-reserves/entrada-reserves.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './views/login/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ModalContentComponent } from './views/modal-content/modal-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

ToastrModule.forRoot({
  positionClass: 'toast-top-center',
  toastClass: 'custom-toast',
  // Otras opciones de configuración...
})

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EntradaComponent,
    ReservesComponent,
    EntradaReservesComponent,
    ReservationComponent,
    MenuComponent,
    ModalContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    NgbDatepickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


