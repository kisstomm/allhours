import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEditComponent } from './absence-edit.component';

describe('AbsenceEditComponent', () => {
  let component: AbsenceEditComponent;
  let fixture: ComponentFixture<AbsenceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceEditComponent]
    });
    fixture = TestBed.createComponent(AbsenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
