import { TestBed } from '@angular/core/testing';

import { PdfHandlerService } from './pdf-handler.service';

describe('PdfHandlerService', () => {
  let service: PdfHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
