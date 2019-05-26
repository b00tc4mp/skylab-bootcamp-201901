import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Root
} from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../models/user";
import usersLogic from '../logic/users'


@Resolver(User)
export class UserResolver {
  @Query(() => [User]) 
  async users(){
    return await usersLogic.retrieveAll()
  }

}