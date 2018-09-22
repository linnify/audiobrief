import { TestBed, async, inject } from '@angular/core/testing';

import { UserTopicsGuard } from './user-topics.guard';

describe('UserTopicsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTopicsGuard]
    });
  });

  it('should ...', inject([UserTopicsGuard], (guard: UserTopicsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
