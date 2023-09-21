import { InvalidAmountError } from '../errors/invalid-amount.error';
import { Amount } from './amount';

describe('Amount', () => {
  it('should allow only integer values', () => {
    // When & Then
    expect(() => Amount.from(0.5)).toThrowError(
      new InvalidAmountError(`Amount must be an integer`),
    );
  });

  it('should not go below zero', () => {
    // When
    const result = Amount.from(5).subtract(Amount.from(6));

    // Then
    expect(result.value).toBe(0);
  });

  it('should add two amounts', async () => {
    // When
    const result = Amount.from(2).add(Amount.from(2));

    // Then
    expect(result.value).toBe(4);
  });

  it.each([
    {
      given: 4,
      expected: 2,
    },
    {
      given: 0,
      expected: 0,
    },
    {
      given: 5,
      expected: 2,
    },
  ])('should halve the amount', ({ given, expected }) => {
    // When
    const result = Amount.from(given).halve();

    // Then
    expect(result.value).toEqual(expected);
  });

  it.each([
    {
      given: 4,
      expected: 8,
    },
    {
      given: 0,
      expected: 0,
    },
  ])('should double the amount', ({ given, expected }) => {
    // When
    const result = Amount.from(given).double();

    // Then
    expect(result.value).toEqual(expected);
  });

  it.each([
    {
      given: 4,
      expected: 0,
    },
    {
      given: 0,
      expected: 0,
    },
  ])('should negate the amount', ({ given, expected }) => {
    // When
    const result = Amount.from(given).negate();

    // Then
    expect(result.value).toEqual(expected);
  });

  it.each([
    {
      given: 4,
      other: 8,
      expected: 8,
    },
    {
      given: 0,
      other: 0,
      expected: 0,
    },
    {
      given: 0,
      other: 4,
      expected: 4,
    },
  ])('should return greater amount', ({ given, other, expected }) => {
    // When
    const result = Amount.from(given).max(Amount.from(other));

    // Then
    expect(result.value).toEqual(expected);
  });

  it.each([
    {
      given: 4,
      other: 8,
      expected: 4,
    },
    {
      given: 0,
      other: 0,
      expected: 0,
    },
    {
      given: 0,
      other: 4,
      expected: 0,
    },

    {
      given: 4,
      other: 0,
      expected: 0,
    },
  ])('should return lower amount', ({ given, other, expected }) => {
    // When
    const result = Amount.from(given).min(Amount.from(other));

    // Then
    expect(result.value).toEqual(expected);
  });
});
