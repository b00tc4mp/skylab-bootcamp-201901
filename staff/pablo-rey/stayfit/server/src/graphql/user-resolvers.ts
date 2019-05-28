import { IsEmail, IsIn, Length } from 'class-validator';
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import usersLogic from '../logic/users';
import { ROLES, User } from './../models/user';

@InputType()
export class CreateInput {
  @Field()
  @Length(1, 40)
  name: string;

  @Field()
  @Length(1, 40)
  surname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  @IsIn(ROLES)
  role: string;
}

@Resolver(User)
export class UserResolver {
  @Query(returns => [User])
  async users() {
    return await usersLogic.retrieveAll();
  }

  @Mutation(returns => User)
  async createUser(@Arg('data')
  {
    email,
    name,
    surname,
    password,
    role,
  }: CreateInput) {
    return usersLogic.create({ name, surname, email, password, role });
  }
}
