import { TestBed } from '@angular/core/testing';

import { DoggiesService } from './doggies.service';

describe('DoggiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoggiesService = TestBed.get(DoggiesService);
    expect(service).toBeTruthy();
  });
});
