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
import { ReservationComponent } from './views/reservation/reservation.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './views/login/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ModalContentComponent } from './views/modal-content/modal-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateModalComponent } from './views/update-modal/update-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { IgxTimePickerModule, IgxToastModule } from 'igniteui-angular';


//I keep the new line
ToastrModule.forRoot({
  positionClass: 'toast-top-center',
  toastClass: 'custom-toast',
  // Otras opciones de configuración...
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EntradaComponent,
    ReservesComponent,
    ReservationComponent,
    MenuComponent,
    ModalContentComponent,
    UpdateModalComponent,

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
    IgxTimePickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IgxToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe // Agrega DatePipe como proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

