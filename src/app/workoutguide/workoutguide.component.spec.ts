import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutguideComponent } from './workoutguide.component';

describe('WorkoutguideComponent', () => {
  let component: WorkoutguideComponent;
  let fixture: ComponentFixture<WorkoutguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
