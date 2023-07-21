import { TestBed } from '@angular/core/testing';

import { AmlEndpointService } from './aml-endpoint.service';

describe('AmlEndpointService', () => {
  let service: AmlEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmlEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
