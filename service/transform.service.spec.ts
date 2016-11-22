/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransformService } from './transform.service';

describe('Service: TransformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformService]
    });
  });

  it('should create', inject([TransformService], (service: TransformService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Service: TransformService => toNumberFormat', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TransformService]
      });
    });
    
    it(`should define function 'toNumberFormat'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat).toBeDefined();
    }));
    
    it(`should return '1,000.00' when input equal '1000'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000')).toBe('1,000.00');
    }));
    
    it(`should return '1,000.00' when input equal '1000.004'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000.004')).toBe('1,000.00');
    }));
    
    it(`should return '1,000.00' when input equal '1000.005'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000.005')).toBe('1,000.01');
    }));
    
    it(`should return '1,000.01' when input equal '1000.006'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000.006')).toBe('1,000.01');
    }));
    
    it(`should return '1,000.00' when input equal '001000.00'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('001000.00')).toBe('1,000.00');
    }));
    
    it(`should return '1,000.00' when input equal '1000.0000'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000.0000')).toBe('1,000.00');
    }));
    
    it(`should return '1,000.00' when input equal '1000.0045'`, inject([TransformService], (service: TransformService) => {
      expect(service.toNumberFormat('1000.0045')).toBe('1,000.00');
    }));
});
