import { TestBed } from '@angular/core/testing';

import { ChosenAnswersService } from './chosen-answers.service';

describe('ChosenAnswersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChosenAnswersService = TestBed.get(ChosenAnswersService);
    expect(service).toBeTruthy();
  });
});
