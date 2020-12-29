import { TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { SearchService } from '../search.service';
import { SearchMockService } from '../search-mock.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [
        SearchBarComponent,
        { provide: SearchService, useClass: SearchMockService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(SearchBarComponent);
    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
