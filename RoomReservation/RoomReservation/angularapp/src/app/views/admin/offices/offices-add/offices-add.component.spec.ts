import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesAddComponent } from './offices-add.component';

describe('OfficesAddComponent', () => {
  let component: OfficesAddComponent;
  let fixture: ComponentFixture<OfficesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficesAddComponent]
    });
    fixture = TestBed.createComponent(OfficesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
