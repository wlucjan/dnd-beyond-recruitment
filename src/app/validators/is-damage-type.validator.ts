import { isDamageType } from '@/modules/character/domain/damage/damage';
import { ValidationOptions, registerDecorator } from 'class-validator';

export function IsDamageType(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isDamageType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${propertyName} should be a valid damage type`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && isDamageType(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
