import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomsDeleteComponent } from './meeting-rooms-delete.component';

describe('MeetingRoomsDeleteComponent', () => {
  let component: MeetingRoomsDeleteComponent;
  let fixture: ComponentFixture<MeetingRoomsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingRoomsDeleteComponent]
    });
    fixture = TestBed.createComponent(MeetingRoomsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
