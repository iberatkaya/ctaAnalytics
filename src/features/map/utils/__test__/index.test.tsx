// Note: import explicitly to use the types shipped with jest.
import { it, describe, expect } from '@jest/globals';

import { parseLocationString } from '..';

describe('Util function tests', () => {
  it('parses values correctly', () => {
    const string = '(41.85182, -87.745336)';
    const res = parseLocationString(string);
    expect(res[0]).toBe(41.85182);
    expect(res[1]).toBe(-87.745336);
  });

  it('parses both negative values correctly', () => {
    const string = '(-11.85182, -27.745336)';
    const res = parseLocationString(string);
    expect(res[0]).toBe(-11.85182);
    expect(res[1]).toBe(-27.745336);
  });

  it('parses both positive values correctly', () => {
    const string = '(41.182, 87.336)';
    const res = parseLocationString(string);
    expect(res[0]).toBe(41.182);
    expect(res[1]).toBe(87.336);
  });
});
