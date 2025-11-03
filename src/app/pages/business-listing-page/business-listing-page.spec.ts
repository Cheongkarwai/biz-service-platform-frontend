import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListingPage } from './business-listing-page';

describe('BusinessListingPage', () => {
  let component: BusinessListingPage;
  let fixture: ComponentFixture<BusinessListingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessListingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
