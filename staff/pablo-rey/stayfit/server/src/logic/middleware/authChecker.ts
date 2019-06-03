import { AuthenticationError } from './../../common/errors/index';
import { AuthChecker } from 'type-graphql';
import { AuthorizationError, LogicError } from '../../common/errors';
import { Provider, ProviderModel } from '../../data/models/provider';
import { UserModel, User } from '../../data/models/user';
import { MyContext } from './MyContext';
import { SUPERADMIN_ROLE } from '../../data/models/user';

export const ONLY_SUPERADMIN = 'ONLY_SUPERADMIN';
export const ONLY_OWN_USER = 'ONLY_OWN_USER';
export const ONLY_ADMINS_OF_PROVIDER = 'ONLY_PROVIDER_ADMIN';
export const ALWAYS_OWN_USER = 'ALWAYS_OWN_USER';
export const ALWAYS_OWN_CUSTOMER = 'ALWAYS_OWN_CUSTOMER';

export const authChecker: AuthChecker<MyContext> = async ({ root, args, context, info }, roles) => {
  const ownerId = context.userId;
  let ownerRole = context.role;
  let owner: User | null = null;

  if (!ownerId || !ownerRole) throw new AuthorizationError('Invalid credentials to authentication');

  // ALWAYS checking
  if (ownerRole === SUPERADMIN_ROLE) return true;

  for (let role of roles) {
    let userId: string;
    switch (role) {
      case ALWAYS_OWN_USER:
        userId = info.variableValues.userId;
        if (ownerId === userId) return true;
        break;
      case ALWAYS_OWN_CUSTOMER:
        userId = info.variableValues.userId;
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
        if (ownerId !== userId) throw new AuthenticationError('Only own user can do that');
        break;
      case ONLY_ADMINS_OF_PROVIDER:
        const providerId = info.variableValues.providerId;
        if (!providerId) throw new LogicError(`Provider is required`);
        owner = context.user = await UserModel.findById(ownerId);
        if (!owner!.adminOf.includes(providerId)) throw new AuthenticationError('Only admins can do that')
        break;
    }
  }
  return true; // or false if access is denied
};
