import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteSearch } from './autocomplete-search';

describe('AutocompleteSearch', () => {
  let component: AutocompleteSearch;
  let fixture: ComponentFixture<AutocompleteSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
