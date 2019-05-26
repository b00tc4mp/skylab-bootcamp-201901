import { User, UserType } from './../models/user';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Root
} from "type-graphql";
import * as bcrypt from "bcryptjs";

import usersLogic from '../logic/users'


@Resolver(User)
export class UserResolver {
  @Query(() => [User]) 
  async users () {
    return await usersLogic.retrieveAll()
  }

}