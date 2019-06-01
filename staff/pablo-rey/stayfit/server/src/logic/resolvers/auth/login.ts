import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { isEmail } from 'validator';
import { ValidationError } from '../../../common/errors';
import { UserModel } from '../../../data/models/user';
import { refreshToken } from '../../../common/token/refresh-tokens';
import { MyContext } from '../../middleware/MyContext';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@InputType()
export class LoginArgs {
  // @IsEmail()
  @IsNotEmpty()
  @Field(type => String)
  email: string;

  @IsNotEmpty()
  @Field(type => String)
  password: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(@Arg('input') { email, password }: LoginArgs, @Ctx() ctx: MyContext): Promise<AuthResponse> {
    if (!isEmail(email)) throw new ValidationError('email must be an email');
    const user = await UserModel.findOne({ email });

    if (!user) throw new AuthenticationError('wrong credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AuthenticationError('wrong credentials');

    return await refreshToken(user, ctx);
  }
}
