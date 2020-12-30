import { TestBed } from '@angular/core/testing';
import { NominationsManagerComponent } from './nominations-manager.component';
import { SearchService } from '../search/search.service';
import { SearchMockService } from '../search/search-mock.service';
import { Movies } from '../shared/movie.interface';
import { of } from 'rxjs';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('NominationsManagerComponent', () => {
  let component: NominationsManagerComponent;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationsManagerComponent ],
      providers: [
        NominationsManagerComponent,
        { provide: SearchService, useClass: SearchMockService },
      ],
      imports: [ MatSnackBarModule, BrowserAnimationsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  let movie;
  let event;
  beforeEach(() => {
    component = TestBed.inject(NominationsManagerComponent);
    searchService = TestBed.inject(SearchService);
    movie = { Title: 'test', Year: '1999', imdbID: 1337, Poster: 'url'};
    event = { Title: 'wow', Year: '2001', imdbID: 867, Poster: 'url'};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setSearchResults', () => {
    it('should set the search results', () => {
      const searchResults: Movies = {
        Search: [
          { Title: 'test', Year: '1999', imdbID: 1337, Poster: 'url'},
          { Title: 'test2', Year: '2020', imdbID: 969, Poster: 'url'}
        ]
      };
      component.setSearchResults(searchResults);

      expect(component.searchResults).toEqual(searchResults.Search);
    });
  });

  describe('addNominations', () => {
    describe('the list as more than 5 nominations', () => {
      it('should not change the nominations list', () => {
        component.nominationsList = [movie, movie, movie, movie, movie];

        component.addNominations(event);

        expect(component.nominationsList).toEqual([movie, movie, movie, movie, movie]);
      });
    });

    describe('the movie is already in the nominations list', () => {
      it('should not change the nominations list', () => {
        const nominationsList = [movie, movie, movie, event];
        component.nominationsList = nominationsList;

        component.addNominations(event);

        expect(component.nominationsList.length).toBe(4);
        expect(component.nominationsList).toEqual(nominationsList);
      });
    });

    describe('the movie is not in the list and the nomination list < 5', () => {
      it('should add the movie to the nomination list', () => {
        const nominationsList = [movie, movie, movie, event];
        const newMovie = { Title: 'pompom', Year: '2017', imdbID: 867, Poster: 'url'};
        component.nominationsList = nominationsList;

        component.addNominations(newMovie);

        expect(component.nominationsList.find(x => x === newMovie)).toEqual(newMovie);
        expect(component.nominationsList.length).toBe(5);
      });
    });
  });

  describe('removeNominations', () => {
    describe('the movie is in the nominations list', () => {
      it('should remove the movie', () => {
        const nominationsList = [movie, movie, movie, event];
        const nominationsListWithouEvent = [movie, movie, movie];
        component.nominationsList = nominationsList;

        component.removeNominations(event);

        expect(component.nominationsList).toEqual(nominationsListWithouEvent);
      });
    });

    describe('the movie is not in the nominations list', () => {
      it('should do nothing', () => {
        const nominationsList = [movie, movie, movie];
        component.nominationsList = nominationsList;

        component.removeNominations(event);

        expect(component.nominationsList).toEqual(nominationsList);
      });
    });
  });

  describe('setSelectedMovieDetails', () => {
    beforeEach(() => {
      spyOn(searchService, 'getMovieByImdbID').and.returnValue( of(event));
    });

    it('sets detailsCardLoaded to true', () => {
      component.setSelectedMovieDetails(867);

      expect(component.isDetailCardLoaded).toBe(true);
    });

    it('sets the selected movie', () => {
      component.setSelectedMovieDetails(867);

      expect(component.selectedMovie).toEqual(event);
    });
  });
});
