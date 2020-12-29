import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationsManagerComponent } from './nominations-manager.component';
import {SearchService} from '../search/search.service';
import {SearchMockService} from '../search/search-mock.service';


describe('NominationsManagerComponent', () => {
  let component: NominationsManagerComponent;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationsManagerComponent ],
      providers: [
        NominationsManagerComponent,
        { provide: SearchService, useClass: SearchMockService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(NominationsManagerComponent);
    searchService = TestBed.inject(SearchService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
