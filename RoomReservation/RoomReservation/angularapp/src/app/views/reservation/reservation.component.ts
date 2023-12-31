import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  predefinedCountries: any[] = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'United Kingdom' },
    { id: 3, name: 'France' },
    { id: 4, name: 'Germany' },
    { id: 5, name: 'Spain' },
    { id: 6, name: 'Italy' },
    { id: 7, name: 'Japan' },
    { id: 8, name: 'Australia' },
    { id: 9, name: 'Canada' },
    { id: 10, name: 'Mexico' },
  ];

  countries: any[] = [];
  cities: any[] = [];
  offices: any[] = [];
  meetingRooms: any[] = [];
  filteredMeetingRooms: any[] = [];

  selectedCountryId: number | null = null;
  selectedCityId: number | null = null;
  selectedOfficeId: number | null = null;
  selectedMeetingRoom: any = null;

  constructor(private apiService: ApiService, private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Intenta cargar los datos desde el localStorage
    const storedCountries = localStorage.getItem('countries');

    if (navigator.onLine) {
      // Si hay conexión, intenta cargar los datos desde la API
      this.apiService.getCountries().subscribe(
        (data) => {
          this.countries = data;
          console.log('Countries loaded (online)' + JSON.stringify(data));

          // Guardar los países en el localStorage para su acceso sin conexión
          localStorage.setItem('countries', JSON.stringify(data));
        },
        (error) => {
          console.error('Error fetching countries from API:', error);

          // Si hay un error al cargar desde la API, verifica si hay datos en el localStorage
          if (storedCountries) {
            this.countries = JSON.parse(storedCountries);
            console.log('Countries loaded from localStorage (offline):', this.countries);
          } else {
            // Si no hay datos en el localStorage y ocurre un error en la API, usa los países predefinidos
            this.countries = this.predefinedCountries;
            console.log('Using predefined countries (offline):', this.countries);
          }
        }
      );
    } else if (storedCountries) {
      // Si no hay conexión a Internet pero hay datos en el localStorage, usa los datos del localStorage
      this.countries = JSON.parse(storedCountries);
      console.log('Countries loaded from localStorage (offline):', this.countries);
    } else {
      // Si no hay conexión a Internet ni datos en el localStorage, usa los países predefinidos
      this.countries = this.predefinedCountries;
      console.log('Using predefined countries (offline):', this.countries);
    }



    // Obtener todas las ciudades
    this.getAllCities();
    this.getAllOffices();

    // Inicializar la selección de ciudades y oficinas en blanco
    this.selectedCityId = null;
    this.selectedOfficeId = null;
  }

  getAllCities(): void {
    this.apiService.getCities().subscribe(
      (data) => {
        this.cities = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getAllOffices(): void {
    // Llamada al método local para obtener todas las ciudades
    this.apiService.getOffices().subscribe(
      (data) => {
        this.offices = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching offices:', error);
      }
    );
  }

  //getAllOfficesByCountry(): void {
  //  // Obtener todas las oficinas de las ciudades del país seleccionado
  //  const cityIds = this.cities.map((city) => city.cityId);
  //  console.log(cityIds);
  //  if (cityIds.length > 0) {
  //    this.http
  //      .post<any[]>('https://localhost:7281/api/offices/getOfficesByCityIds', cityIds)
  //      .subscribe(
  //        (offices) => {
  //          this.offices = offices;
  //        },
  //        (error) => {
  //          console.error('Error fetching offices:', error);
  //        }
  //      );
  //  } else {
  //    // Si no hay ciudades, mostrar todas las oficinas
  //    this.getAllOffices();
  //  }
  //}

  getCitiesByCountryId(): void {
    if (this.selectedCountryId) {
      // Llamada al método local para obtener las ciudades del país seleccionado
      this.apiService.getCitiesByCountryId(this.selectedCountryId).subscribe(
        (cities) => {
          this.cities = cities;
          // Si se selecciona un país, obtener todas las oficinas de las ciudades de ese país
          //this.getAllOfficesByCountry();
          //this.filterMeetingRooms(); // Mover este método aquí para asegurarte de que se ejecute después de actualizar las selecciones
          this.selectedCityId = null; // Limpiar la selección de la ciudad
          this.selectedOfficeId = null; // Limpiar la selección de la oficina
        },
        (error) => {
          console.error('Error fetching cities:', error);
        }
      );
    } else {
      // Si no hay país seleccionado, mostrar todas las ciudades y todas las oficinas
      this.getAllCities();
      this.getAllOffices();

      this.selectedCityId = null; // Limpiar la selección de la ciudad
      this.selectedOfficeId = null; // Limpiar la selección de la oficina
    }
  }

  getOfficesByCityId(): void {
    if (this.selectedCityId) {
      /* Llamada al método local para obtener las oficinas de la ciudad seleccionada */
      this.apiService.getOfficesByCityId(this.selectedCityId).subscribe(
        (offices) => {
          this.offices = offices;
          /*          this.filterMeetingRooms(); */// Actualizar las salas de reuniones basadas en la oficina seleccionada
        },
        (error) => {
          console.error('Error fetching offices:', error);
        }
      );
    } else {
      // Si no hay ciudad seleccionada, mostrar todas las oficinas del país seleccionado
      // this.getAllOfficesByCountry();
    }
  }

  //onOfficeSelected(): void {
  //  const selectedOffice = this.offices.find((office) => office.officeId === this.selectedOfficeId);
  //  if (selectedOffice) {
  //    this.selectedCityId = selectedOffice.cityId;
  //    this.selectedCountryId = selectedOffice.city.countryId;
  //    // Actualizar la lista de ciudades y oficinas
  //    this.getCitiesByCountryId();
  //    this.getOfficesByCityId();
  //  }
  //}

  //updateSelectedCountry(cityId: number) {
  //  const selectedCity = this.cities.find((city) => city.cityId === cityId);
  //  this.selectedCountryId = selectedCity ? selectedCity.countryId : null;
  //}

  clearSelection(): void {
    this.selectedCountryId = null;
    this.selectedCityId = null;
    this.selectedOfficeId = null;
    this.getCitiesByCountryId();
    this.getOfficesByCityId();
    this.filteredMeetingRooms = []; // Vaciar el arreglo para que los contenedores de las salas de reuniones desaparezcan
  }


  //getAllMeetingRooms(): void {
  //  // Llamada al método local para obtener todas las salas de reuniones
  //  this.http.get<any[]>('https://localhost:7281/api/meetingrooms').subscribe(
  //    (data) => {
  //      this.meetingRooms = data;
  //      this.filteredMeetingRooms = data; // Inicializar las salas de reuniones filtradas con todas las salas
  //    },
  //    (error) => {
  //      console.error('Error fetching meeting rooms:', error);
  //    }
  //  );
  //}


  getMeetingRoomsByOfficeId(): void {
    if (this.selectedOfficeId) {
      this.apiService.getMeetingRoomsByOfficeId(this.selectedOfficeId).subscribe(
        (meetingRooms) => {
          this.meetingRooms = meetingRooms;
          this.filteredMeetingRooms = meetingRooms;
        },
        (error) => {
          console.error('Error fetching meeting rooms:', error);
        }
      );
    } else {
      // Si no hay oficina seleccionada, mostrar todas las salas de reuniones
      this.filteredMeetingRooms = this.meetingRooms;
    }
  }

  filterMeetingRooms(): void {
    if (this.selectedOfficeId) {
      // Filtrar las salas de reuniones por oficina seleccionada
      this.filteredMeetingRooms = this.meetingRooms.filter((room) => room.officeId === this.selectedOfficeId);
    } else if (this.selectedCityId) {
      // Filtrar las salas de reuniones por ciudad seleccionada
      this.filteredMeetingRooms = this.meetingRooms.filter((room) => room.cityId === this.selectedCityId);
    } else if (this.selectedCountryId) {
      // Filtrar las salas de reuniones por país seleccionado
      this.filteredMeetingRooms = this.meetingRooms.filter((room) => room.countryId === this.selectedCountryId);
    } else {
      // Si no hay selección, mostrar todas las salas de reuniones
      this.filteredMeetingRooms = this.meetingRooms;
    }
  }




  //getAllReserves(): void {
  //  this.http.get<any[]>('https://localhost:7281/api/Reserves').pipe(
  //    map((reservations) => reservations.map((reservation) => reservation.meetingRoomId))
  //  ).subscribe(
  //    (reservedIds) => {
  //      this.reservedRoomIds = reservedIds;
  //    },
  //    (error) => {
  //      console.error('Error fetching reservations:', error);
  //    }
  //  );
  //}

  //toggleSelection(room: any): void {
  //  if (!this.reservedRoomIds.includes(room.meetingRoomId)) {
  //    room.selected = !room.selected;
  //  }
  //}

  // Función para cambiar el estado de selección de una sala de reuniones
  toggleSelection(room: any): void {
    room.selected = !room.selected;
  }


  openModal(salaReunion: any): void {
    // Pasar los datos de la sala de reuniones seleccionada al modal
    console.log('Sala de reunión seleccionada:', salaReunion);
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { salaReunion }
    });

    // Obtener la sala de reuniones seleccionada del modal cuando se cierra (si es necesario)
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed:', result);

      // Reiniciar la selección de la sala de reuniones solo si el resultado del modal es válido
      if (result) {
        salaReunion = null;
      }
    });
  }

  closeModal(): void {
    // Desseleccionamos la sala de reuniones
    this.selectedMeetingRoom = null;
  }


}
