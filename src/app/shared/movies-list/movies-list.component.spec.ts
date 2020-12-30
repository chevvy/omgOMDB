import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';
import { Movie } from '../movie.interface';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emitRemove', () => {
    it('should emit $event', () => {
      spyOn(component.removeNomination, 'emit');
      const $event = {} as any;

      component.emitRemove($event);

      expect(component.removeNomination.emit).toHaveBeenCalledWith($event);
    });
  });

  describe('emitNominate', () => {
    it('should emit $event', () => {
      spyOn(component.addNomination, 'emit');
      const $event = {} as any;

      component.emitNominate($event);

      expect(component.addNomination.emit).toHaveBeenCalledWith($event);
    });
  });

  describe('emitGetMovieDetails', () => {
    it('should emit $event', () => {
      spyOn(component.getMovieDetails, 'emit');
      const $event = {} as any;

      component.emitGetMovieDetails($event);

      expect(component.getMovieDetails.emit).toHaveBeenCalledWith($event);
    });
  });

  describe('canMovieBeNominated', () => {
    let movie: Movie;
    let nominationsList: Movie[];
    beforeEach(() => {
      movie = { Title: 'test', Year: '1999', imdbID: 1337, Poster: 'url'};
      nominationsList = [
          movie,
          { Title: 'test2', Year: '2020', imdbID: 969, Poster: 'url'}
        ];
    });

    describe('the nominations list is undef', () => {
      it('can be nominated and returns true', () => {
        expect(component.canMovieBeNominated(movie)).toEqual(true);
      });
    });

    describe('the nominations list includes the movie', () => {
      it('cant be nominated and returns false', () => {
        component.nominations = nominationsList;

        expect(component.canMovieBeNominated(movie)).toEqual(false);
      });
    });

    describe('the nominations list doesnt includes the movie', () => {
      it('can be nominated and returns true', () => {
        component.nominations = nominationsList;
        expect(
          component.canMovieBeNominated({
            Title: 'notTest', Year: '1999', imdbID: 1337, Poster: 'url'
          })).toEqual(true);
      });
    });
  });

  describe('canMovieBeRemoved', () => {
    let movie: Movie;
    let nominationsList: Movie[];
    beforeEach(() => {
      movie = { Title: 'test', Year: '1999', imdbID: 1337, Poster: 'url'};
      nominationsList = [
        movie,
        { Title: 'test2', Year: '2020', imdbID: 969, Poster: 'url'}
      ];
    });

    describe('the nominations list is undef', () => {
      it('cant be removed and returns false', () => {
        expect(component.canMovieBeRemoved(movie)).toEqual(false);
      });
    });

    describe('the nominations list includes the movie', () => {
      it('can be removed and returns true', () => {
        component.nominations = nominationsList;

        expect(component.canMovieBeRemoved(movie)).toEqual(true);
      });
    });

    describe('the nominations list doesnt includes the movie', () => {
      it('cant be removed and returns false', () => {
        component.nominations = nominationsList;
        expect(
          component.canMovieBeRemoved({
            Title: 'notTest', Year: '1999', imdbID: 1337, Poster: 'url'
          })).toEqual(false);
      });
    });
  });
});
