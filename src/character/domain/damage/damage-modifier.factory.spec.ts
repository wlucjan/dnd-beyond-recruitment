import { DamageModifierFactory } from './damage-modifier.factory';
import { DamageImmunity, DamageResistance } from './damage-modifiers';
import { UnknownDamageModifierTypeException } from './errors/unknown-damage-modifier-type.exception';
import { UnknownDamageTypeException } from './errors/unknown-damage-type.exception';

describe('DamageModifierFactory', () => {
  describe('fromSerialized', () => {
    it.each([
      {
        defense: {
          type: 'fire',
          defense: 'resistance',
        },
        modifier: DamageResistance.from('fire'),
      },
      {
        defense: {
          type: 'fire',
          defense: 'immunity',
        },
        modifier: DamageImmunity.from('fire'),
      },
    ])(
      'should create damage modifier from serialized defense',
      ({ defense, modifier }) => {
        // When
        const factoredModifier = DamageModifierFactory.fromSerialized(defense);

        // Then
        expect(factoredModifier).toEqual(modifier);
      },
    );

    it('should throw if unknown defense type provided', () => {
      // Given
      const defense = {
        type: 'fire',
        defense: 'unknown',
      };

      // When & Then
      expect(() => DamageModifierFactory.fromSerialized(defense)).toThrow(
        UnknownDamageModifierTypeException,
      );
    });

    it('should throw if unknown damage type provided', () => {
      // Given
      const defense = {
        type: 'unknown',
        defense: 'resistance',
      };

      // When & Then
      expect(() => DamageModifierFactory.fromSerialized(defense)).toThrow(
        UnknownDamageTypeException,
      );
    });
  });
});
