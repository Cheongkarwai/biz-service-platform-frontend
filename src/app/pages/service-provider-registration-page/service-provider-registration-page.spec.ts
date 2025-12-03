import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderRegistrationPage } from './service-provider-registration-page';

describe('ServiceProviderRegistrationPage', () => {
  let component: ServiceProviderRegistrationPage;
  let fixture: ComponentFixture<ServiceProviderRegistrationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderRegistrationPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
