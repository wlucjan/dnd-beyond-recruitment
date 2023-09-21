import { Defense } from '../defenses/defense';
import { DamageDealt } from './damage';
import { CharacterDamageCalculator } from './damage-calculator';
import { DamageModifiers } from './damage-modifiers';

describe('DamageCalculator', () => {
  describe('calculate', () => {
    it('should apply damage modifiers to all damage parts', () => {
      // Given
      const damageParts = [
        DamageDealt.from('slashing', 10),
        DamageDealt.from('fire', 5),
        DamageDealt.from('cold', 5),
      ];

      const damageModifiers = DamageModifiers.from([
        new Defense('immunity', 'slashing'),
        new Defense('resistance', 'fire'),
      ]);

      // When
      const calculator = new CharacterDamageCalculator();
      const finalDamage = calculator.calculate(damageParts, damageModifiers);

      // Then
      expect(finalDamage).toEqual([
        DamageDealt.from('slashing', 0),
        DamageDealt.from('fire', 2),
        DamageDealt.from('cold', 5),
      ]);
    });
  });
});
