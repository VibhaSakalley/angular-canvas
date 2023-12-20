import { TestBed } from '@angular/core/testing';

import { AngularCanvasService } from './angular-canvas.service';

describe('AngularCanvasService', () => {
  let service: AngularCanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularCanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
