import { Amount } from '../core/amount';
import { NormalHitPoints } from './hit-points';
import { HitPointsWithTemporaryHitPoints } from './hit-points-with-temporary-hit-points';

describe('HitPointsWithTemporaryHitPoints', () => {
  describe('confer', () => {
    it.each([
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20),
            Amount.from(0),
          ),
        confered: 10,
        expected: 30,
      },
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20),
            Amount.from(8),
          ),
        confered: 10,
        expected: 30,
      },
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20),
            Amount.from(12),
          ),
        confered: 10,
        expected: 32,
      },
    ])(
      'should take the larger of amounts',
      async ({ current, confered, expected }) => {
        // Given
        const temporaryHitPoints = current();

        // When
        const result = temporaryHitPoints.confer(Amount.from(confered));

        // Then
        expect(result.currentAmount.value).toEqual(expected);
      },
    );
  });

  describe('heal', () => {
    it('should not affect temporary hit points', async () => {
      // Given
      const hitPointsWithTemporaryHitPoints =
        HitPointsWithTemporaryHitPoints.from(
          NormalHitPoints.from(20, 10),
          Amount.from(5),
        );

      // When
      const result = hitPointsWithTemporaryHitPoints.heal(Amount.from(15));

      // Then
      expect(result.currentAmount.value).toEqual(25);
    });
  });

  describe('dealDamage', () => {
    it.each([
      {
        damageDealt: 5,
        expectedHitPointsAmount: 15,
      },
      {
        damageDealt: 10,
        expectedHitPointsAmount: 10,
      },
      {
        damageDealt: 0,
        expectedHitPointsAmount: 20,
      },
      {
        damageDealt: 15,
        expectedHitPointsAmount: 5,
      },
    ])(
      'should lose temporary hit points before normal hit points',
      async ({ damageDealt, expectedHitPointsAmount }) => {
        // Given
        const hitPointsWithTemporaryHitPoints =
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20, 10),
            Amount.from(10),
          );

        // When
        const result = hitPointsWithTemporaryHitPoints.dealDamage(
          Amount.from(damageDealt),
        );

        // Then
        expect(result.currentAmount.value).toEqual(expectedHitPointsAmount);
      },
    );
  });
});
