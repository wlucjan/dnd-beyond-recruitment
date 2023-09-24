import { Amount } from '../core/amount';
import { DamageDealt } from '../damage/damage';
import { CharacterDamageCalculator } from '../damage/damage-calculator';
import { Defense } from '../defenses/defense';
import { Character } from './character';
import { NormalHitPoints } from './hit-points';
import { HitPointsWithTemporaryHitPoints } from './hit-points-with-temporary-hit-points';

describe('Character', () => {
  describe('dealDamage', () => {
    it('should deal damage modified by defenses', () => {
      // Given
      const character = new Character(
        new CharacterDamageCalculator(),
        'luc',
        HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(25)),
        [
          new Defense('resistance', 'slashing'),
          new Defense('immunity', 'fire'),
        ],
      );

      // When
      character.dealDamage([
        DamageDealt.from('slashing', 10),
        DamageDealt.from('fire', 5),
      ]);

      // Then
      expect(character.hitPoints).toEqual(
        HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(25, 20)),
      );
    });
  });

  describe('heal', () => {
    it('should heal', () => {
      // Given
      const character = new Character(
        new CharacterDamageCalculator(),
        'luc',
        HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(25, 20)),
        [
          new Defense('resistance', 'slashing'),
          new Defense('immunity', 'fire'),
        ],
      );

      // When
      character.heal(Amount.from(5));

      // Then
      expect(character.hitPoints).toEqual(
        HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(25)),
      );
    });
  });

  describe('conferTemporaryHitPoints', () => {
    it('should use temporary hit points first', () => {
      // Given
      const character = new Character(
        new CharacterDamageCalculator(),
        'luc',
        HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(25, 20)),
        [
          new Defense('resistance', 'slashing'),
          new Defense('immunity', 'fire'),
        ],
      );

      // When
      character.conferTemporaryHitpoints(Amount.from(5));
      character.dealDamage([DamageDealt.from('slashing', 10)]);

      // Then
      expect(character.hitPoints.currentAmount).toEqual(Amount.from(20));
      expect(character.hitPoints.temporaryAmount).toEqual(Amount.from(0));
    });
  });
});
