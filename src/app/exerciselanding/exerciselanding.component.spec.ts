import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciselandingComponent } from './exerciselanding.component';

describe('ExerciselandingComponent', () => {
  let component: ExerciselandingComponent;
  let fixture: ComponentFixture<ExerciselandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciselandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciselandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
