import * as bcrypt from 'bcryptjs';
import { IsEmail, IsIn, Length, IsNotEmpty } from 'class-validator';
import { Arg, Field, InputType, Mutation, Resolver, Ctx } from 'type-graphql';
import { ValidationError } from '../../../common/errors';
import { ROLES, User, UserModel } from '../../../models/user';
import { checkAuth } from '../../authorization';
import { isIn } from 'validator';
import { MyContext } from '../../../common/types/MyContext';

export const AUTH_USER_CREATE = 'AUTH_USER_CREATE';

@InputType()
export class CreateInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  surname: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  password: string;

  @Field()
  @IsIn(ROLES)
  role: string;
}

@Resolver(User)
export class CreateUserResolver {
  @Mutation(returns => String)
  async createUser(
    @Arg('data')
    { email, name, surname, password, role }: CreateInput,
    @Ctx() ctx: MyContext
  ) {
    // Custom Validations
    if (!password || password!.trim() === '') throw new ValidationError('password is required');
    const _users = await UserModel.find({ email });
    if (_users.length) throw new ValidationError('email already registered');
    if (!isIn(role, ROLES)) throw new ValidationError('role must be one of [' + ROLES.join(',') + ']');

    // Authorization
    const owner = ctx && ctx.user;
    await checkAuth(AUTH_USER_CREATE, { owner, role });

    // Create
    const hashPassword = await bcrypt.hash(password!, 12);
    try {
      const user = await UserModel.create({ name, surname, email, password: hashPassword, role });
      return user.id;
    } catch (err) {
      const { errors } = err;
      const keys = Object.keys(err.errors);
      const { name, path, kind, message } = errors[keys[0]];
      if (name === 'ValidatorError') {
        if (kind === 'required') throw new ValidationError(`${path} is required`);
        else throw new ValidationError(message);
      }
      throw err;
    }
  }
}
