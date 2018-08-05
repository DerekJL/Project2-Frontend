import { TestBed, inject } from '@angular/core/testing';

import { UserexerciseService } from './userexercise.service';

describe('UserexerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserexerciseService]
    });
  });

  it('should be created', inject([UserexerciseService], (service: UserexerciseService) => {
    expect(service).toBeTruthy();
  }));
});
