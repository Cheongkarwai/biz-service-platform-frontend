import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessAddress } from './edit-business-address';

describe('EditBusinessAddress', () => {
  let component: EditBusinessAddress;
  let fixture: ComponentFixture<EditBusinessAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
