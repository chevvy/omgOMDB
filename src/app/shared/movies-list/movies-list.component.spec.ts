import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';

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
});
