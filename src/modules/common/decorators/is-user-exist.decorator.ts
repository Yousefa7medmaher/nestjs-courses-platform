import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
@ValidatorConstraint({ async: true })  
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {} 

  async validate(userId: string, args: ValidationArguments) {
    if (!userId) return false;  
    const user = await this.usersService.findOne(+userId); 
    return !!user; 
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with id $value does not exist';
  }
}


export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    });
  };
}
