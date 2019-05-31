import * as bcrypt from 'bcryptjs';
import { IsEmail, IsIn, Length, IsNotEmpty } from 'class-validator';
import { Arg, Field, InputType, Mutation, Resolver, Ctx } from 'type-graphql';
import { ValidationError, AuthorizationError } from '../../../common/errors';
import { ROLES, User, UserModel, GUEST_ROLE, SUPERADMIN_ROLE, USER_ROLE } from '../../../models/user';
import { isIn, isEmail } from 'validator';
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
    if (!isEmail(email)) throw new ValidationError('email must be an email')
    const _users = await UserModel.find({ email });
    if (_users.length) throw new ValidationError('email already registered');

    // Authorization
    const owner = ctx ? ctx!.user || (await UserModel.findById(ctx.userId)) : null;
    if (!role) throw new AuthorizationError('role for new user not provided');
    if (!isIn(role, [USER_ROLE, GUEST_ROLE])) {
      if (!owner || owner.role !== SUPERADMIN_ROLE)
        throw new AuthorizationError('you need to be authenticated to create this role of user');
    }

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
