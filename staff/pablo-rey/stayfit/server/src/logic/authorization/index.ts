import { isEmpty, isIn } from 'validator';
import { AuthorizationError, LogicError } from '../../common/errors';
import {
  ADMIN_ROLE,
  BUSINESS_ROLE,
  GUEST_ROLE,
  STAFF_ROLE,
  SUPERADMIN_ROLE,
  UserModel,
  User,
  USER_ROLE,
} from '../../models/user';
import {
  AUTH_PROVIDERS_ADDCUSTOMER,
  AUTH_PROVIDERS_CREATE,
  AUTH_PROVIDERS_REMOVECUSTOMER,
  AUTH_PROVIDERS_UPDATEADMINS,
  AUTH_PROVIDERS_UPDATECOACHES,
} from '../providers';
import { AUTH_USER_CREATE, leanUser } from '../users';
import { Provider } from './../../models/provider';

export type AuthResult = {
  ok: boolean;
  error?: Error;
};

type Payload = {
  owner?: User | string | null;
  role?: string | null;
  provider?: Provider | null;
  userId?: UserType | null;
};

export async function throwAuth(action: string, payload: Payload): Promise<void> {
  const response = await authPolicies(action, payload);
  if (!response.ok) throw response.error;
}

export async function authPolicies(action: string, payload: Payload): Promise<AuthResult> {
  let owner: User | null;
  if (!payload.owner && action === AUTH_USER_CREATE && payload.role === GUEST_ROLE) {
    return { ok: true };
  } else if (typeof payload.owner === 'string') {
    if (!payload.owner || isEmpty(payload.owner))
      return { ok: false, error: new AuthorizationError('owner not provided') };
    owner = await UserModel.findById(payload.owner);
    if (!owner) return { ok: false, error: new AuthorizationError('owner not provided') };
  } else {
    owner = payload.owner!;
  }
  if (!owner) return { ok: false, error: new AuthorizationError('owner not provided') };
  if (owner.role === SUPERADMIN_ROLE) return { ok: true };

  switch (action) {
    case AUTH_USER_CREATE:
      const { role } = payload;
      if (!role) return { ok: false, error: new AuthorizationError('role for new user not provided') };
      if (isIn(role, [GUEST_ROLE])) return { ok: true };
      if (owner.role === BUSINESS_ROLE && isIn(role, [ADMIN_ROLE, STAFF_ROLE, GUEST_ROLE, USER_ROLE]))
        return { ok: true };
      if (owner.role === ADMIN_ROLE && isIn(role, [STAFF_ROLE, GUEST_ROLE, USER_ROLE])) return { ok: true };
      else if (owner.role === STAFF_ROLE && isIn(role, [GUEST_ROLE, USER_ROLE])) return { ok: true };
      return {
        ok: false,
        error: new AuthorizationError('Not authorized to create a user with ' + role),
      };

    case AUTH_PROVIDERS_UPDATEADMINS:
    case AUTH_PROVIDERS_CREATE:
      return { ok: false, error: new AuthorizationError() };

    case AUTH_PROVIDERS_UPDATECOACHES:
      if (!payload.provider) throw new LogicError(`Provider is required`);
      if (payload.provider.isAdmin(owner.id!)) return { ok: true };
      return { ok: false, error: new AuthorizationError() };

    case AUTH_PROVIDERS_ADDCUSTOMER:
    case AUTH_PROVIDERS_REMOVECUSTOMER:
      const { provider, userId } = payload;
      if (!provider) throw new LogicError(`Provider is required`);
      if (!userId) throw new LogicError(`User is required`);
      if (provider.isAdmin(owner.id!)) return { ok: true };
      return { ok: false, error: new AuthorizationError() };
  }

  return { ok: false, error: new AuthorizationError('unknown authorization error') };
}
