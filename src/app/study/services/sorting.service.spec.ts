import { TestBed } from '@angular/core/testing';

import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('areTwoArraysEqual', () => {
      it('should return false when arrays are different', () => {
      const a1 = [1, 2, 3];
      const a2 = [2, 3];
      const b1 = [1, 2, 3];
      const b2 = [1, 2, 4];
      const c1 = [1, 2, 3, 4, 5, 6];
      const c2 = [1, 3, 4, 5, 6, 7];
      const returnA = service.areTwoArraysEqual(a1, a2);
      const returnB = service.areTwoArraysEqual(b1, b2);
      const returnC = service.areTwoArraysEqual(c1, c2);
      expect(returnA).toBeFalse();
      expect(returnB).toBeFalse();
      expect(returnC).toBeFalse();
    });

    it('should return true when arrays have the same elements', () => {
      const a1 = [1, 2, 3];
      const a2 = [2, 3, 1];
      const b1 = ['1', '2', '3', '4'];
      const b2 = ['1', '3', '4', '2'];
      const returnA = service.areTwoArraysEqual(a1, a2);
      const returnB = service.areTwoArraysEqual(b1, b2);
      expect(returnA).toBeTrue();
      expect(returnB).toBeTrue();
    });
  });

  describe('isArrayIncludedInListOfArrays', () => {
    it('should return true if array is included', () => {
      const arrays = [[1, 2, 3], [2, 3, 4]];
      const arr = [2, 3, 4];
      const returnValue = service.isArrayIncludedInListOfArrays(arr, arrays);
      expect(returnValue).toBeTrue();
    });

    it('should return false if array is not included', () => {
      const arrays = [[1, 2, 3], [2, 3, 4]];
      const arr = [1, 2, 5];
      const returnValue = service.isArrayIncludedInListOfArrays(arr, arrays);
      expect(returnValue).toBeFalse();
    });
  });

  describe('getArrayOfUniqueValues', () => {
    it('should return an array without repetitions', () => {
      const input1 = [[1, 2, 3], [1, 3, 2], [4, 5, 6], [1, 2, 3], [6, 7, 8]];
      const expectedOutput1 = [[1, 2, 3], [4, 5, 6], [6, 7, 8]];
      const input2 = [['1', '2', '3', '4'], ['1', '3', '2', '4']];
      const expectedOutput2 = [['1', '2', '3', '4']]
      const output1 = service.getArrayOfUniqueValues(input1);
      const output2 = service.getArrayOfUniqueValues(input2);
      expect(output1).toEqual(expectedOutput1);
      expect(output2).toEqual(expectedOutput2);
    })
  })
});
