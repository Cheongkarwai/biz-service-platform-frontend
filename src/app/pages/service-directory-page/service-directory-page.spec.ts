import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDirectoryPage } from './service-directory-page';

describe('ServiceDirectoryPage', () => {
  let component: ServiceDirectoryPage;
  let fixture: ComponentFixture<ServiceDirectoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDirectoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
