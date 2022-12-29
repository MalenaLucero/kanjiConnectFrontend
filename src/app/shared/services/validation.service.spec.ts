import { TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate jlpt level', () => {
    const jlpt1 = 1;
    const jlpt2 = 2;
    const jlpt3 = 3;
    const jlpt4 = 4;
    const jlpt5 = 5;
    const jlpt0 = 0;
    const jlpt6 = 6;
    expect(service.isJlptValid(jlpt1)).toBe(true);
    expect(service.isJlptValid(jlpt2)).toBe(true);
    expect(service.isJlptValid(jlpt3)).toBe(true);
    expect(service.isJlptValid(jlpt4)).toBe(true);
    expect(service.isJlptValid(jlpt5)).toBe(true);
    expect(service.isJlptValid(jlpt0)).toBe(false);
    expect(service.isJlptValid(jlpt6)).toBe(false);
  })

  it('should validate mongo id', () => {
    const validMongoId = '61605e149e01832a809af74a';
    const invalidMongoId = '1234';
    expect(service.isMongoIdValid(validMongoId)).toBe(true);
    expect(service.isMongoIdValid(invalidMongoId)).toBe(false);
  })

  it('should validate validation array', () => {
    const validArray = [true, true, true];
    const invalidArray = [true, false];
    expect(service.isValidationArrayValid(validArray)).toBe(true);
    expect(service.isValidationArrayValid(invalidArray)).toBe(false);
  })
});
