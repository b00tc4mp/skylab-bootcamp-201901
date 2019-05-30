import * as bcrypt from 'bcryptjs';
import { IsEmail, IsIn, Length, IsNotEmpty } from 'class-validator';
import { Arg, Field, InputType, Mutation, Resolver, Ctx } from 'type-graphql';
import { ValidationError, AuthorizationError } from '../../../common/errors';
import { ROLES, User, UserModel, GUEST_ROLE, SUPERADMIN_ROLE } from '../../../models/user';
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
      const _users = await UserModel.find({ email });
      if (_users.length) throw new ValidationError('email already registered');
      
      // Authorization
        const authFailed = {
          ok: false,
          error: new AuthorizationError('Not authorized to create a user with ' + role),
        }
    const owner = ctx ? ctx!.user || await UserModel.findById(ctx.userId) : null;
    // if (!role) return { ok: false, error: new AuthorizationError('role for new user not provided') };
    // if (isIn(role, [GUEST_ROLE])) return { ok: true };
    // if (!owner) return authFailed;
    // // TODO: si es un usuario administrador de un provider entonces puede crear

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
