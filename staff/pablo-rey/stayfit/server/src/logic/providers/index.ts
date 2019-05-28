import { Types } from 'mongoose';
import { ProviderModel, Provider } from '../../models/provider';
import { User, UserModel, UserType, SUPERADMIN_ROLE, ADMIN_ROLE } from '../../models/user';
import { AuthorizationError, LogicError, ValidationError } from '../errors';
import { isIn, isEmpty } from 'validator';

export default {
  async create({ name }: { name: string }, owner: UserType) {
    if (!owner || owner.role !== SUPERADMIN_ROLE) throw new AuthorizationError();
    const provider = await ProviderModel.create({ name, admins: [], coaches: [], customers: [] });
    return provider;
  },

  async updateAdmins(
    { providerId, admins }: { providerId: string; admins: string[] },
    owner: UserType
  ) {
    if (!providerId) throw new ValidationError('providedId is required');
    if (!owner || owner.role !== SUPERADMIN_ROLE) throw new AuthorizationError();
    let provider = await ProviderModel.findById(providerId);
    if (!provider) throw new LogicError(`Provider with id ${providerId} not found`);

    provider.admins = admins.map(id => Types.ObjectId(id));
    await provider.save();
    return true;
  },

  async updateCoaches(
    { providerId, coaches }: { providerId: string; coaches: string[] },
    owner: UserType
  ) {
    if (!owner) throw new AuthorizationError('Owner of operation is required');
    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new LogicError(`Provider with id ${providerId} not found`);
    if (
      owner.role !== SUPERADMIN_ROLE &&
      !provider.isAdmin(owner.id!)
    ) {
      throw new AuthorizationError();
    }

    provider.coaches = coaches.map(id => Types.ObjectId(id));
    await provider.save();
    return true;
  },

  async addCustomer(providerId: string, newUser: UserType | string, owner: UserType) {
    if (isEmpty(providerId)) throw new ValidationError('providerId is required')
    if (typeof newUser === 'string' && isEmpty(newUser)) throw new ValidationError('newUser is required')

    if (!owner) throw new AuthorizationError('Owner of operation is required');
    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new LogicError(`Provider with id ${providerId} not found`);
    if (owner.role !== SUPERADMIN_ROLE && !provider.isAdmin(owner.id!)) {
      throw new AuthorizationError();
    }
    const newUserId = typeof newUser === 'string' ? newUser : (newUser as any)._id.toString();
    if (!provider.isCustomer(newUser)) provider.customers.push(Types.ObjectId(newUserId));
    await provider.save();
    return true;
  },

  async removeCustomer(providerId: string, userToRemove: UserType | string, owner: UserType) {
    if (isEmpty(providerId)) throw new ValidationError('providerId is required')
    if (typeof userToRemove === 'string' && isEmpty(userToRemove)) throw new ValidationError('userToRemove is required')

    if (!owner) throw new AuthorizationError('Owner of operation is required');
    const provider = await ProviderModel.findById(providerId);
    if (!provider) throw new LogicError(`Provider with id ${providerId} not found`);
    if (owner.role !== SUPERADMIN_ROLE && !provider.isAdmin(owner)) {
      throw new AuthorizationError();
    }
    const newUserId = typeof userToRemove === 'string' ? userToRemove : (userToRemove as any)._id.toString();
    if (!provider.isCustomer(userToRemove)) return false;
    provider.customers = provider.customers.filter(customer => customer.toString() !== newUserId);
    await provider.save();
    return true;
  },

  async list(owner: UserType) {
    if (!owner || owner.role !== SUPERADMIN_ROLE) throw new AuthorizationError();
    return ProviderModel.find()
      .populate('admins')
      .populate('coaches')
      .populate('customers');
  },
};
