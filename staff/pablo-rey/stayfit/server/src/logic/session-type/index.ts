import { Provider } from "./../../models/provider";
import { UserType } from "./../../models/user";
import { throwAuth } from "./../authorization";

export const AUTH_SERVICETYPE_CREATE = 'AUTH_SERVICETYPE_CREATE';
export const AUTH_SERVICETYPE_RETRIEVE = 'AUTH_SERVICETYPE_RETRIEVE';
export const AUTH_SERVICETYPE_UPDATE = 'AUTH_SERVICETYPE_UPDATE';

export default {
  async create({type, title}:{type: string, title: string, provider: Provider, active: boolean}, owner: UserType) {
    throwAuth(AUTH_SERVICETYPE_CREATE, owner);
  }
}