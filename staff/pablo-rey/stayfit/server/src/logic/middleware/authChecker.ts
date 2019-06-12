import { AuthenticationError } from './../../common/errors/index';
import { AuthChecker } from 'type-graphql';
import { AuthorizationError, LogicError } from '../../common/errors';
import { UserModel, User } from '../../data/models/user';
import { Provider } from './../../data/models/provider';
import { MyContext } from './MyContext';
import { SUPERADMIN_ROLE } from '../../data/enums';

export const ONLY_SUPERADMIN = 'ONLY_SUPERADMIN';
export const ONLY_OWN_USER = 'ONLY_OWN_USER';
export const ONLY_ADMINS_OF_PROVIDER = 'ONLY_PROVIDER_ADMIN';
export const ONLY_IF_MY_CUSTOMER = 'ONLY_IF_MY_CUSTOMER';
export const ALWAYS_OWN_USER = 'ALWAYS_OWN_USER';
export const ALWAYS_OWN_CUSTOMER = 'ALWAYS_OWN_CUSTOMER';

export const authChecker: AuthChecker<MyContext> = async ({ root, args, context, info }, roles) => {
  const ownerId = context.userId;
  let ownerRole = context.role;
  let owner: User | null = null;
  const a = info;

  if (!ownerId || !ownerRole) throw new AuthorizationError('Invalid credentials to authentication');

  if (roles.includes(ONLY_OWN_USER) && info.path && info.path.prev && info.path.prev.key === 'me') return true;

  // ALWAYS checking
  if (ownerRole === SUPERADMIN_ROLE) return true;

  let userId: string = args.userId;
  for (let role of roles) {
    switch (role) {
      case ALWAYS_OWN_USER:
        if (ownerId === userId) return true;
        break;
      case ALWAYS_OWN_CUSTOMER:
        let customerUserId = args.userId;
        if (!customerUserId && !!args.data) customerUserId = args.data.userId;
        if (!customerUserId) throw new LogicError(`user target is required`);
        owner = owner || await UserModel.findById(ownerId).populate('adminOf');
        if (!owner) throw new LogicError(`owner not valid`);
        for (let provider of owner.adminOf) {
          if ((provider as Provider).customers.some(id => id.toString() === customerUserId)) return true;
        }
        break;
    }
  }

  // ONLY Checkings
  for (let role of roles) {
    switch (role) {
      case ONLY_SUPERADMIN:
        throw new AuthorizationError('Only SUPERADMIN_ROLE can do this operation');
      case ONLY_OWN_USER:
        const userId = args.userId;
        if (ownerId !== userId) throw new AuthenticationError('Only own user can do that');
        break;
      case ONLY_ADMINS_OF_PROVIDER:
        let providerId = args.providerId;
        if (!providerId && !!args.data) providerId = args.data.providerId;
        if (!providerId) throw new LogicError(`Provider is required`);
        owner = context.user = await UserModel.findById(ownerId);
        if (!owner!.adminOf.includes(providerId)) throw new AuthenticationError('Only admins can do that');
        break;
      case ONLY_IF_MY_CUSTOMER:
        let customerUserId = args.userId;
        if (!customerUserId && !!args.data) customerUserId = args.data.userId;
        if (!customerUserId) throw new LogicError(`user target is required`);
        const customer = await UserModel.findById(customerUserId);
        if (!customer) throw new AuthorizationError('user target not found');
        if (!customer.customerOf.includes(args.providerId)) throw new AuthenticationError('Only can retrieve your customers');
        break;
    }
  }
  return true; // or false if access is denied
};
