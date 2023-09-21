import { Amount } from '../core/amount';
import { NormalHitPoints } from './hit-points';

describe('HitPoints', () => {
  describe('from', () => {
    it.each([
      {
        max: 20,
        current: 0,
        expected: 0,
      },
      {
        max: 20,
        current: undefined,
        expected: 20,
      },
      {
        max: 20,
        current: 10,
        expected: 10,
      },
    ])(
      'should initialize hit points max and current value',
      ({ max, current, expected }) => {
        // When
        const result = NormalHitPoints.from(max, current);

        // Then
        expect(result.currentAmount.value).toEqual(expected);
      },
    );
  });
  describe('heal', () => {
    it.each([
      {
        max: 20,
        current: undefined,
        healed: 10,
        expected: 20,
      },
      {
        max: 20,
        current: 10,
        healed: 10,
        expected: 20,
      },
      {
        max: 20,
        current: 2,
        healed: 10,
        expected: 12,
      },
      {
        max: 20,
        current: 0,
        healed: 10,
        expected: 10,
      },
    ])(
      'should not exceed maximum hit points ($current + $healed < $max)',
      ({ max, current, healed, expected }) => {
        // Given
        const hitPoints = NormalHitPoints.from(max, current);

        // When
        const resultingHitPoints = hitPoints.heal(Amount.from(healed));

        // Then
        expect(resultingHitPoints.currentAmount.value).toEqual(expected);
      },
    );
  });

  describe('dealDamage', () => {
    it.each([
      {
        max: 20,
        current: undefined,
        subtracted: 10,
        expected: 10,
      },
      {
        max: 20,
        current: undefined,
        subtracted: 20,
        expected: 0,
      },
      {
        max: 20,
        current: undefined,
        subtracted: 22,
        expected: 0,
      },
    ])(
      'should not exceed minimum of 0',
      ({ max, current, subtracted, expected }) => {
        // Given
        const hitPoints = NormalHitPoints.from(max, current);

        // When
        const resultingHitPoints = hitPoints.dealDamage(
          Amount.from(subtracted),
        );

        // Then
        expect(resultingHitPoints.currentAmount.value).toEqual(expected);
      },
    );
  });
});
