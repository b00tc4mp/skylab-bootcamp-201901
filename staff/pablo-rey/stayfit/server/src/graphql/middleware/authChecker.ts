import { AuthChecker } from 'type-graphql';
import { AuthorizationError, LogicError } from '../../common/errors';
import { Provider, ProviderModel } from '../../models/provider';
import { UserModel } from '../../models/user';
import { MyContext } from './../../common/types/MyContext';
import { SUPERADMIN_ROLE } from './../../models/user';

export const ONLY_SUPERADMIN = 'ONLY_SUPERADMIN'; // You need to be admin in this provider to receive authorization
export const ONLY_OWN_USER = 'ONLY_OWN_USER'; // You need to be the user to modify this
export const ONLY_ADMINS_OF_PROVIDER = 'ONLY_PROVIDER_ADMIN'; // You need to be admin in this provider to receive authorization
export const ALWAYS_OWN_USER = 'ALWAYS_OWN_USER'; // You need to be admin in this provider to receive authorization

export const authChecker: AuthChecker<MyContext> = async ( { root, args, context, info }, roles) => {
  debugger;
  const ownerId = context.userId;
  const owner = (context.user = await UserModel.findById(ownerId));
  let provider: Provider | null = null;

  if (!owner) throw new AuthorizationError('Invalid credentials provider to authentication');

  // ALWAYS checking
  if (owner.role === SUPERADMIN_ROLE) return true;
  for (let role of roles) {
    switch (role) {
      case ALWAYS_OWN_USER:
        const userId = info.variableValues.userId;
        if (ownerId === userId) return true;
        break;
    }
  }

  // ONLY Checkings
  for (let role of roles) {
    switch (role) {
      case ONLY_SUPERADMIN:
        throw new AuthorizationError('Only SUPERADMIN_ROLE can do this operation');
      case ONLY_OWN_USER:
        const userId = info.variableValues.userId;
        if (ownerId !== userId) throw new LogicError('Only own user can do that');
        break;
      case ONLY_ADMINS_OF_PROVIDER:
        const providerId = info.variableValues.providerId;
        if (!providerId) throw new LogicError(`Provider is required`);
        if (!provider) provider = context.provider = await ProviderModel.findById(providerId);
        if (!provider || !provider.admins.includes(owner)) throw new AuthorizationError();
        break;
    }
  }
  return true; // or false if access is denied
};
