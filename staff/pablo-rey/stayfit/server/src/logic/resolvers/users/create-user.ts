import { RequestCustomerModel, REQUESTBECUSTOMER, PENDING } from './../../../data/models/request';
import { ProviderModel, Provider } from './../../../data/models/provider';
import * as bcrypt from 'bcryptjs';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { isEmail, isIn } from 'validator';
import { AuthorizationError, ValidationError } from '../../../common/errors';
import { MyContext } from '../../middleware/MyContext';
import { GUEST_ROLE, ROLES, SUPERADMIN_ROLE, User, UserModel, USER_ROLE } from '../../../data/models/user';

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

  @Field()
  providerId?: string;
}

@Resolver(User)
export class CreateUserResolver {
  @Mutation(returns => String)
  async createUser(
    @Arg('data')
    { email, name, surname, password, role, providerId}: CreateInput,
    @Ctx() ctx: MyContext
  ) {
    // Custom Validations
    if (!isEmail(email)) throw new ValidationError('email must be an email');
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
    const provider = !!providerId ? await ProviderModel.findById(providerId) : null;
    if (providerId && !provider) throw new ValidationError('provider not found')

    const hashPassword = await bcrypt.hash(password!, 12);
    try {
      const user = await UserModel.create({ name, surname, email, password: hashPassword, role });
      if (provider) await RequestCustomerModel.create({ provider, user, type: REQUESTBECUSTOMER, status: PENDING });
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
