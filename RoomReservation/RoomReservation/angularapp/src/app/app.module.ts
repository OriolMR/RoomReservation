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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateModalComponent } from './views/update-modal/update-modal.component';
import { DatePipe } from '@angular/common';
import { IgxTimePickerModule, IgxToastModule } from 'igniteui-angular';
import { ReservationModalComponent } from './views/reservation-modal/reservation-modal.component';
import { ApiService } from './service/api.service';
import { AdminComponent } from './views/admin/admin.component';
import { EntradaAdminComponent } from './views/admin/entrada-admin/entrada-admin.component';
import { CitiesDeleteComponent } from './views/admin/cities/cities-delete/cities-delete.component';
import { CountriesDeleteComponent } from './views/admin/countries/countries-delete/countries-delete.component';
import { OfficesDeleteComponent } from './views/admin/offices/offices-delete/offices-delete.component';
import { MeetingRoomsDeleteComponent } from './views/admin/meeting-rooms/meeting-rooms-delete/meeting-rooms-delete.component';
import { UsersDeleteComponent } from './views/admin/users/users-delete/users-delete.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ReservesDeleteComponent } from './views/admin/reserves-admin/reserves-delete/reserves-delete.component';
import { UsersaddModalComponent } from './views/admin/users/usersadd-modal/usersadd-modal.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { UserseditModalComponent } from './views/admin/users/usersedit-modal/usersedit-modal.component';
import { CountrieseditModalComponent } from './views/admin/countries/countriesedit-modal/countriesedit-modal.component';
import { CountriesaddModalComponent } from './views/admin/countries/countriesadd-modal/countriesadd-modal.component';
import { CitiesaddModalComponent } from './views/admin/cities/citiesadd-modal/citiesadd-modal.component';

//Material UI
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


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
    ReservationModalComponent,
    UpdateModalComponent,
    AdminComponent,
    EntradaAdminComponent,
    CitiesDeleteComponent,
    CountriesDeleteComponent,
    OfficesDeleteComponent,
    MeetingRoomsDeleteComponent,
    UsersDeleteComponent,
    PageNotFoundComponent,
    ReservesDeleteComponent,
    UsersaddModalComponent,
    ForgotPasswordComponent,
    UserseditModalComponent,
    CountrieseditModalComponent,
    CountriesaddModalComponent,
    CitiesaddModalComponent,
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
    IgxToastModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

