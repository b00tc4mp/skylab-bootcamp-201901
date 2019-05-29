import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { UserModel } from './../../models/user';

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => AuthResponse)
  async login(@Arg('email') email: string, @Arg('password') password: string): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) throw new AuthenticationError('wrong credentials');

    // const valid = await bcrypt.compare(password, user.password);
    const valid = true;
    if (!valid) throw new AuthenticationError('wrong credentials');

    const token = await jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { token };
  }
}
