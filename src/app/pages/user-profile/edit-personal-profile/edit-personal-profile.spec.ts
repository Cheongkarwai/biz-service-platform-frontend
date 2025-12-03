import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalProfile } from './edit-personal-profile';

describe('EditPersonalProfile', () => {
  let component: EditPersonalProfile;
  let fixture: ComponentFixture<EditPersonalProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPersonalProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonalProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
