import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationsManagerComponent } from './nominations-manager.component';

describe('NominationsComponent', () => {
  let component: NominationsManagerComponent;
  let fixture: ComponentFixture<NominationsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
