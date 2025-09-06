import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEgyptianPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
     const egyptPhoneRegex = /^(?:\+20|0)?1[0125][0-9]{8}$/;
     
    return typeof phoneNumber === 'string' && egyptPhoneRegex.test(phoneNumber);
  }

  defaultMessage() {
    return 'Phone number must be a valid Egyptian phone number';
  }
}

export function IsEgyptianPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEgyptianPhoneNumberConstraint,
    });
  };
}
