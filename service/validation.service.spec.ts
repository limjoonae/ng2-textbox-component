/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidationService } from './validation.service';

describe('Service: ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should create', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Service: ValidationService => validateEmail', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });
    it(`should define function 'validateEmail'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateEmail).toBeDefined();
    }));

    it(`should return true when email is 'example_123@email.com'.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example_123@email.com';
      expect(service.validateEmail(emailinput)).toBe(true);
    }));

    it(`should return true when email is 'example_123@email.co.uk'.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example_123@email.co.uk';
      expect(service.validateEmail(emailinput)).toBe(true);
    }));

    it(`should return false when email is '_example@email.com.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = '_example@email.com';
      expect(service.validateEmail(emailinput,)).toBe(false);
    }));

    it(`should return false when email is 'example@email'.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example@email';
      expect(service.validateEmail(emailinput,)).toBe(false);
    }));

});

describe('Service: ValidationService => validateInteger', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });
    it(`should define function 'validateInteger'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateInteger).toBeDefined();
    }));

    it(`should return true if input contain 0-9`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateInteger('123456789000')).toBe(true);
    }));

    it(`should return false if input contain any character out 0-9`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateInteger('12cd345')).toBe(false);
    }));

});

describe('Service: ValidationService => validateNumber', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });

    it(`should define function 'validateNumber'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber).toBeDefined();
    }));

    it(`should return true if input is '12000.0058'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('12000.0058')).toBe(true);
    }));

    it(`should return true if input is '000.0058'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('000.0058')).toBe(true);
    }));

    it(`should return true if input is '000.0000'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('000.0000')).toBe(true);
    }));

    it(`should return false if input is '00hello000'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('00hello000')).toBe(false);
    }));

});