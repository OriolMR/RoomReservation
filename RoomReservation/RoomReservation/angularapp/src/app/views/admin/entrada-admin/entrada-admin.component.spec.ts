import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaAdminComponent } from './entrada-admin.component';

describe('EntradaAdminComponent', () => {
  let component: EntradaAdminComponent;
  let fixture: ComponentFixture<EntradaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaAdminComponent]
    });
    fixture = TestBed.createComponent(EntradaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
