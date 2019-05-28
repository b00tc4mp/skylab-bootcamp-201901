import { Types } from 'mongoose';
import { isEmpty } from 'validator';
import { ProviderModel } from '../../models/provider';
import { UserType } from '../../models/user';
import { throwAuth } from '../authorization';
import { AuthorizationError, ValidationError } from '../errors';

export const AUTH_PROVIDERS_CREATE = 'AUTH_PROVIDERS_CREATE';
export const AUTH_PROVIDERS_UPDATEADMINS = 'AUTH_PROVIDERS_UPDATEADMINS';
export const AUTH_PROVIDERS_UPDATECOACHES = 'AUTH_PROVIDERS_UPDATECOACHES';
export const AUTH_PROVIDERS_ADDCUSTOMER = 'AUTH_PROVIDERS_ADDCUSTOMER';
export const AUTH_PROVIDERS_REMOVECUSTOMER = 'AUTH_PROVIDERS_REMOVECUSTOMER';
export const AUTH_PROVIDERS_LISTALL = 'AUTH_PROVIDERS_LISTALL';

export default {
  async create({ name }: { name: string }, owner: UserType) {
    await throwAuth(AUTH_PROVIDERS_CREATE, { owner });

    const provider = await ProviderModel.create({ name, admins: [], coaches: [], customers: [] });
    return provider;
  },

  async updateAdmins({ providerId, admins }: { providerId: string; admins: string[] }, owner: UserType) {
    if (!providerId) throw new ValidationError('providedId is required');

    const provider = await ProviderModel.findById(providerId);
    await throwAuth(AUTH_PROVIDERS_UPDATEADMINS, { owner, provider });

    provider!.admins = admins.map(id => Types.ObjectId(id));
    await provider!.save();
    return true;
  },

  async updateCoaches({ providerId, coaches }: { providerId: string; coaches: string[] }, owner: UserType) {
    if (!owner) throw new AuthorizationError('Owner of operation is required');

    const provider = await ProviderModel.findById(providerId);
    await throwAuth(AUTH_PROVIDERS_UPDATECOACHES, { owner, provider });

    provider!.coaches = coaches.map(id => Types.ObjectId(id));
    await provider!.save();
    return true;
  },

  async addCustomer(providerId: string, newUser: UserType | string, owner: UserType) {
    if (isEmpty(providerId)) throw new ValidationError('providerId is required');
    if (typeof newUser === 'string' && isEmpty(newUser)) throw new ValidationError('newUser is required');

    const provider = await ProviderModel.findById(providerId);
    const newUserId = typeof newUser === 'string' ? newUser : (newUser as any)._id.toString();
    await throwAuth(AUTH_PROVIDERS_ADDCUSTOMER, { owner, userId: newUserId, provider });

    if (!provider!.isCustomer(newUser)) provider!.customers.push(Types.ObjectId(newUserId));
    await provider!.save();
    return true;
  },

  async removeCustomer(providerId: string, userToRemove: UserType | string, owner: UserType) {
    if (isEmpty(providerId)) throw new ValidationError('providerId is required');
    if (typeof userToRemove === 'string' && isEmpty(userToRemove))
      throw new ValidationError('userToRemove is required');

    const provider = await ProviderModel.findById(providerId);
    const userId = typeof userToRemove === 'string' ? userToRemove : (userToRemove as any)._id.toString();
    await throwAuth(AUTH_PROVIDERS_REMOVECUSTOMER, { owner, userId, provider });

    if (!provider!.isCustomer(userToRemove)) return false;
    provider!.customers = provider!.customers.filter(customer => customer.toString() !== userId);
    await provider!.save();
    return true;
  },

  async list(owner: UserType) {
    await throwAuth(AUTH_PROVIDERS_LISTALL, { owner });
    return ProviderModel.find()
      .populate('admins')
      .populate('coaches')
      .populate('customers');
  },
};
