import { DamageDealt } from './damage';
import { DamageImmunity, DamageResistance } from './damage-modifiers';

describe('DamageModifiers', () => {
  describe('DamageResistance', () => {
    it.each([
      {
        damageAmount: 0,
        expectedAmount: 0,
      },
      {
        damageAmount: 10,
        expectedAmount: 5,
      },
      {
        damageAmount: 11,
        expectedAmount: 5,
      },
      {
        damageAmount: 12,
        expectedAmount: 6,
      },
    ])(
      'should halve damage rounding down',
      ({ damageAmount, expectedAmount }) => {
        // Given
        const damage = DamageDealt.from('fire', damageAmount);

        // When
        const finalDamage = DamageResistance.from('fire').apply(damage);

        // Then
        expect(finalDamage.damageAmount.value).toEqual(expectedAmount);
      },
    );
  });

  describe('DamageImmunity', () => {
    it.each([
      {
        damageAmount: 0,
      },
      {
        damageAmount: 10,
      },
      {
        damageAmount: 11,
      },
      {
        damageAmount: 12,
      },
    ])('should negate damage', ({ damageAmount }) => {
      // Given
      const damage = DamageDealt.from('fire', damageAmount);

      // When
      const finalDamage = DamageImmunity.from('fire').apply(damage);

      // Then
      expect(finalDamage.damageAmount.value).toEqual(0);
    });
  });
});
