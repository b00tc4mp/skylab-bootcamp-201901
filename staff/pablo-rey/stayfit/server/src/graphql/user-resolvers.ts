import { User, UserType, ROLES } from './../models/user';
import { Resolver, Query, Mutation, Arg, Root } from 'type-graphql';

import usersLogic from '../logic/users';

import { Length, IsEmail, IsIn } from 'class-validator';
import { Field, InputType } from 'type-graphql';

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
