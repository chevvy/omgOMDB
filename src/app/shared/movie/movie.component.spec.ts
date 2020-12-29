import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieComponent } from './movie.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent, MatExpansionPanel ],
      imports: [ BrowserAnimationsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = { Title: 'test', Year: '1999', imdbID: 1337, Poster: 'url'};
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('if movie is removable', () => {
      it('should set the tileAddState to "added"', () => {
        component.isMovieRemovable = true;

        component.ngOnInit();

        expect(component.tileAddState).toBe('added');
      });
    });
    describe('if move is not removable', () =>  {
      it('the tileAddState should be "notadded"', () => {
        component.isMovieRemovable = false;

        component.ngOnInit();

        expect(component.tileAddState).toBe('notadded');
      });
    });
  });

  describe('nominateClicked', () => {
    beforeEach(() => {
      spyOn(component.tileExpansionPanel, 'close');
    });

    it('emits the movie', () => {
      spyOn(component.nominateMovie, 'emit');
      const movie = {
        Title: 'test',
        Year: '1991',
        imdbID: 123,
        Poster: 'url'
      };
      component.movie = movie;

      component.nominateClicked();

      expect(component.nominateMovie.emit).toHaveBeenCalledWith(movie);
    });
    it('close the expansion panel', () => {
      component.nominateClicked();

      expect(component.tileExpansionPanel.close).toHaveBeenCalled();
    });
  });

  describe('removeClicked', () => {
    let movie;
    beforeEach(() => {
      spyOn(component.removeMovie, 'emit');
      movie = {
        Title: 'test',
        Year: '1991',
        imdbID: 123,
        Poster: 'url'
      };
      component.movie = movie;
    });

    describe('if isTileRemoved is false', () => {
      it('doesnt  emit the movie', () => {
        component.removeClicked();

        expect(component.removeMovie.emit).not.toHaveBeenCalled();
      });
    });

    describe('if isTileRemove is true', () => {
      it('emits the movie', () => {
        component.isTileRemoved = true;

        component.removeClicked();

        expect(component.removeMovie.emit).toHaveBeenCalledWith(movie);
      });
    });
  });

  describe('getMoreDetailsClicked', () => {
    let movie;
    beforeEach(() => {
      movie = {
        Title: 'test',
        Year: '1991',
        imdbID: 123,
        Poster: 'url'
      };
      component.movie = movie;
      spyOn(component.tileExpansionPanel, 'close');
      spyOn(component.getMovieDetails, 'emit');
    });

    it('emits the movie`s imdbID', () => {
      component.getMoreDetailsClicked();

      expect(component.getMovieDetails.emit).toHaveBeenCalledWith(movie.imdbID);
    });

    it('should close the expansion panel', () => {
      component.getMoreDetailsClicked();

      expect(component.tileExpansionPanel.close).toHaveBeenCalled();
    });
  });

  describe('tileClicked', () => {
    describe('the tile is expanded', () => {
      it('should set isTileExpanded to false', () => {
        component.isTileExpanded = true;

        component.tileClicked();

        expect(component.isTileExpanded).toBe(false);
      });
    });

    describe('the tile is not expanded', () => {
      it('should set isTileExpanded to true', () => {
        component.isTileExpanded = false;

        component.tileClicked();

        expect(component.isTileExpanded).toBe(true);
      });
    });
  });
});
