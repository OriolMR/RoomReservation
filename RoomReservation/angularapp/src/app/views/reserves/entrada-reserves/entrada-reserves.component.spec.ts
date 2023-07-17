import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaReservesComponent } from './entrada-reserves.component';

describe('EntradaReservesComponent', () => {
  let component: EntradaReservesComponent;
  let fixture: ComponentFixture<EntradaReservesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaReservesComponent]
    });
    fixture = TestBed.createComponent(EntradaReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
