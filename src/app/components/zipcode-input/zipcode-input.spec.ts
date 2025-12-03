import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeInput } from './zipcode-input';

describe('ZipcodeInput', () => {
  let component: ZipcodeInput;
  let fixture: ComponentFixture<ZipcodeInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipcodeInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZipcodeInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
