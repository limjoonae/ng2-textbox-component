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

    it(`should return empty string message when email format is correct.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example@email.com';
      let warningMsg = 'please input valid data';
      expect(service.validateEmail(emailinput, warningMsg)).toBe('');
    }));

    it(`should return warning message when email format is not correct.`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example@email';
      let warningMsg = 'please input valid data';
      expect(service.validateEmail(emailinput, warningMsg)).toBe(warningMsg);
    }));

    it(`should return default warningMsg when email format is not correct and warningMsg is not specified .`, inject([ValidationService], (service: ValidationService) => {
      let emailinput = 'example@email';
      let defaultWarningMsg = 'please input valid email';
      expect(service.validateEmail(emailinput)).toBe(defaultWarningMsg);
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

    it(`should return true if number more than 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('1')).toBe(true);
    }));

    it(`should return false if number equal 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('0')).toBe(false);
    }));

    it(`should return false if number less than 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('-1')).toBe(false);
    }));

    it(`should return false if number more than 0 but begin 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('01')).toBe(false);
    }));

    it(`should return false if number contain another character not 1 to 9`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('1,750,350')).toBe(false);
    }));

    it(`should return false if number have floating point`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumber('350.50')).toBe(false);
    }));
});

describe('Service: ValidationService => validateNumberIncludeZero', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });
    it(`should define function 'validateNumberIncludeZero'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero).toBeDefined();
    }));

    it(`should return true if number is begin 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('0350')).toBe(true);
    }));

    it(`should return true if number more than 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('1')).toBe(true);
    }));

    it(`should return true if number equal 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('0')).toBe(true);
    }));

    it(`should return false if number less than 0`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('-1')).toBe(false);
    }));

    it(`should return false if number contain another character not 1 to 9`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('1,750,350')).toBe(false);
    }));

    it(`should return false if number have floating point`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateNumberIncludeZero('350.50')).toBe(false);
    }));
});

describe('Service: ValidationService => validateCurrency', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ValidationService]
      });
    });
    it(`should define function 'validateCurrency'`, inject([ValidationService], (service: ValidationService) => {
      expect(service.validateCurrency).toBeDefined();
    }));

    let validateResultList = {};
    let currencyNumber: string;
    let defaultTextOutput: string;
    let warningTextOutput: string;
    let warningTextInput = 'please input valid number';

    it(`should Pass & not return warning text when input to equal '-1'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-1', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual('');
    }));

    it(`should Pass & not return warning text when input to equal '0'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('0', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual('');
    }));

    it(`should Pass & not return warning text when input to equal '0.05'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('0.05', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual('');
    }));

    it(`should not return warning text & return '-0.05' when input to equal '-0.05'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-0.05', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual('');
    }));

    it(`should Pass & not return warning text when input to equal '-00.05'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-00.05', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual('');
    }));

    it(`should return warning text when input to equal '-0'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-0', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual(warningTextInput);
    }));

    it(`should return warning text when input to equal '-0.00'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-0.00', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual(warningTextInput);
    }));

    it(`should return warning text when input to equal '-01.00'`, inject([ValidationService], (service: ValidationService) => {
      validateResultList = service.validateCurrency('-01.00', warningTextInput);
      warningTextOutput = validateResultList['warningText'];
      expect(warningTextOutput).toEqual(warningTextInput);
    }));
});