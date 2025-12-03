import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessesPage } from './manage-businesses-page';

describe('ManageBusinessesPage', () => {
  let component: ManageBusinessesPage;
  let fixture: ComponentFixture<ManageBusinessesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBusinessesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
