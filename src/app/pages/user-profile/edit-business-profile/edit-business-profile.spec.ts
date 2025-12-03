import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessProfile } from './edit-business-profile';

describe('EditBusinessProfile', () => {
  let component: EditBusinessProfile;
  let fixture: ComponentFixture<EditBusinessProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
