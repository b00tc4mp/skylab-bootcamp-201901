import { Types } from 'mongoose';
import { ProviderModel, Provider } from '../../models/provider';
import { User, UserModel } from 'src/models/user';

export default {
  async create({ name }: { name: string }) {
    const provider = await ProviderModel.create({ name, admins: [], coaches: [], customers: [] });
    return provider;
  },

  async updateAdmins( providerId: string, admins: string[]) {
    let provider = await ProviderModel.findById(providerId);
    if (!provider) throw Error;
    provider.admins.push(Types.ObjectId(admins[0])) //  = admins.map(async id => await UserModel.findById(id));
    await provider.save();
    provider = await ProviderModel.findById(providerId).populate('admins');
    return provider!;
  },

  async list() {
    return [];
  },
};
