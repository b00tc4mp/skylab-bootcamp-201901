import * as bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { isMongoId, isEmpty, isEmail, isIn } from 'validator';
import { AuthorizationError, AuthenticationError, ValidationError, LogicError} from '../errors/index';
import {
  UserType,
  UserModel,
  ROLES,
  SUPERADMIN_ROLE,
  ADMIN_ROLE,
  STAFF_ROLE,
  GUEST_ROLE,
  USER_ROLE,
  BUSINESS_ROLE,
} from '../../models/user';

function leanUser(user: UserType): UserType {
  return {
    id: user._id!.toString(),
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  };
}

function authenticationChecking( userRole: string, owner?: UserType): AuthenticationError | null {
  if (isIn(userRole, [GUEST_ROLE])) return null;
  if (!owner) return new AuthorizationError('Not authorized to create a user with ' + userRole);

  if (owner.role === SUPERADMIN_ROLE) return null;
  else if (owner.role === BUSINESS_ROLE && isIn(userRole, [ADMIN_ROLE, STAFF_ROLE, GUEST_ROLE, USER_ROLE])) return null;
  else if (owner.role === ADMIN_ROLE && isIn(userRole, [STAFF_ROLE, GUEST_ROLE, USER_ROLE])) return null;
  else if (owner.role === STAFF_ROLE && isIn(userRole, [GUEST_ROLE, USER_ROLE])) return null;
  return new AuthorizationError('Not authorized to create a user with ' + userRole);
}

export default {
  async create({ name, surname, email, password, role }: UserType, owner?: UserType) {
    // Custom Validations
    if (!password || password!.trim() === '') throw new ValidationError('password is required');
    const _users = await UserModel.find({ email });
    if (_users.length) throw new ValidationError('email already registered');
    if (!isIn(role, ROLES)) throw new ValidationError('role must be one of [' + ROLES.join(',') + ']');

    // Authorization
    const authError = authenticationChecking(role, owner);
    if (authError) throw authError;

    // Create
    const hashPassword = await bcrypt.hash(password!, 12);
    try {
      const user = await UserModel.create({ name, surname, email, password: hashPassword, role });
      return leanUser(user);
    } catch (err) {
      const { errors } = err;
      const keys = Object.keys(err.errors);
      const { name, path, kind, message } = errors[keys[0]];
      if (name === 'ValidatorError') {
        if (kind === 'required') throw new ValidationError(`${path} is required`);
        else throw new ValidationError(message);
      }
      throw err;
    }
  },

  async login(email: string, password: string) {
    if (isEmpty(email)) throw new ValidationError('email is required');
    if (!isEmail(email)) throw new ValidationError('email not contains a valid email');
    if (isEmpty(password)) throw new ValidationError('password is required');
    const user = await UserModel.findOne({ email });
    if (!user) throw new AuthenticationError('wrong credentials');
    if (await !bcrypt.compare(password, user.password)) {
      throw new AuthenticationError('wrong credentials');
    }
    return { id: user.id.toString(), role: user.role };
  },

  async retrieve(id: string | Schema.Types.ObjectId) {
    if (typeof id === 'string' && !isMongoId(id)) throw new ValidationError('id is not correct');
    const user = await UserModel.findById(id);
    if (!user) throw new LogicError('id not found');
    return leanUser(user);
  },

  async retrieveAll() {
    const users = await UserModel.find();
    return users.map(user => leanUser(user));
  },
};
