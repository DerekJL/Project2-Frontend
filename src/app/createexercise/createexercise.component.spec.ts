import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexerciseComponent } from './createexercise.component';

describe('CreateexerciseComponent', () => {
  let component: CreateexerciseComponent;
  let fixture: ComponentFixture<CreateexerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateexerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateexerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
