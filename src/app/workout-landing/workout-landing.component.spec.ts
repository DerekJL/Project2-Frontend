import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLandingComponent } from './workout-landing.component';

describe('WorkoutLandingComponent', () => {
  let component: WorkoutLandingComponent;
  let fixture: ComponentFixture<WorkoutLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
