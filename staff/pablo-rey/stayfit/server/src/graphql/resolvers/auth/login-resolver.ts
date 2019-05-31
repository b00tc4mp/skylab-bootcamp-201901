import { AuthenticationError } from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { refreshToken } from './../../../common/token/refresh-tokens';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, Authorized } from 'type-graphql';
import { UserModel } from '../../../models/user';
import { MyContext } from './../../../common/types/MyContext';
import { isEmail } from 'validator';
import { ValidationError } from '../../../common/errors';

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
  @Query(() => String)
  async hello(@Ctx() ctx: MyContext) {
    if (!ctx.userId) throw Error;
    return 'hello';
  }

  @Mutation(() => AuthResponse)
  async login(@Arg('input') { email, password }: LoginArgs, @Ctx() ctx: MyContext): Promise<AuthResponse> {
    
    if (!isEmail(email)) throw new ValidationError('email must be an email')
    const user = await UserModel.findOne({ email });

    if (!user) throw new AuthenticationError('wrong credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AuthenticationError('wrong credentials');

    return await refreshToken(user, ctx);
  }
}
