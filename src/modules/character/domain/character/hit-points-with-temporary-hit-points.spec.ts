import { Amount } from '../core/amount';
import { NormalHitPoints } from './hit-points';
import { HitPointsWithTemporaryHitPoints } from './hit-points-with-temporary-hit-points';

describe('HitPointsWithTemporaryHitPoints', () => {
  describe('confer', () => {
    it.each([
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(20)),
        confered: 10,
        expected: 10,
      },
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20),
            Amount.from(8),
          ),
        confered: 10,
        expected: 10,
      },
      {
        current: () =>
          HitPointsWithTemporaryHitPoints.from(
            NormalHitPoints.from(20),
            Amount.from(12),
          ),
        confered: 10,
        expected: 12,
      },
    ])(
      'should take the larger of amounts',
      async ({ current, confered, expected }) => {
        // Given
        const temporaryHitPoints = current();

        // When
        const result = temporaryHitPoints.confer(Amount.from(confered));

        // Then
        expect(result.temporaryAmount.value).toEqual(expected);
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
      expect(result.currentAmount.value).toEqual(20);
      expect(result.temporaryAmount.value).toEqual(5);
    });
  });

  describe('dealDamage', () => {
    it.each([
      {
        damageDealt: 5,
        expectedCurrent: 10,
        expectedTemporary: 5,
      },
      {
        damageDealt: 10,
        expectedCurrent: 10,
        expectedTemporary: 0,
      },
      {
        damageDealt: 0,
        expectedCurrent: 10,
        expectedTemporary: 10,
      },
      {
        damageDealt: 15,
        expectedCurrent: 5,
        expectedTemporary: 0,
      },
    ])(
      'should lose temporary hit points before normal hit points',
      async ({ damageDealt, expectedCurrent, expectedTemporary }) => {
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
        expect(result.currentAmount.value).toEqual(expectedCurrent);
        expect(result.temporaryAmount.value).toEqual(expectedTemporary);
      },
    );
  });
});
