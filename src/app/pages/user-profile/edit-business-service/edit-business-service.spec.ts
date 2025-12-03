import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessService } from './edit-business-service';

describe('EditBusinessService', () => {
  let component: EditBusinessService;
  let fixture: ComponentFixture<EditBusinessService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBusinessService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBusinessService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
