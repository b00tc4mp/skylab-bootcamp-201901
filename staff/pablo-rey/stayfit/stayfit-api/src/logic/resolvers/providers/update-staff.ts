import { Types } from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../middleware/MyContext';
import { Provider, ProviderModel } from '../../../data/models/provider';
import { UserModel } from '../../../data/models/user';
import { compareArrays, distinct } from '../../../common/utils';
import { ValidationError } from '../../../common/errors';
import { ONLY_ADMINS_OF_PROVIDER, ONLY_SUPERADMIN } from '../../middleware/authChecker';

@Resolver(Provider)
export class UpdateProviderStaffResolver {
  /**
   * Updates the complete list of admins of a provider 
   * 
   * @param providerId 
   * @param adminsId 
   * @param ctx 
   */
  @Authorized(ONLY_SUPERADMIN)
  @Mutation(returns => Boolean)
  async updateProviderAdmins(
    @Arg('providerId') providerId: string,
    @Arg('usersId', () => [String]) adminsId: string[],
    @Ctx() ctx: MyContext
  ) {
    return await updateStaff('admins', providerId, adminsId);
  }

  /**
   * Updates the complete list of coaches of a provider
   *  
   * @param providerId 
   * @param coachesId 
   * @param ctx 
   */
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async updateProviderCoaches(
    @Arg('providerId') providerId: string,
    @Arg('usersId', () => [String]) coachesId: string[],
    @Ctx() ctx: MyContext
  ) {
    return await updateStaff('coaches', providerId, coachesId);
  }
}

async function updateStaff(type: string, providerId: string, usersId: string[]) {
  const provider = await ProviderModel.findById(providerId);
  if (!provider) throw new ValidationError('provider is required');
  const oldStaff =
    type === 'admins'
      ? provider!.admins.map(staff => staff.toString())
      : provider!.coaches.map(staff => staff.toString());
  const { addNew, removeOld } = compareArrays(oldStaff, usersId);
  if (addNew) {
    const addNewPop = await UserModel.find({ _id: addNew });
    if (addNewPop.length !== addNew.length)
      throw new ValidationError(`${addNewPop.length - addNew.length} user ids not found`);
    for (let u of addNewPop) {
      if (type === 'admins') u.adminOf.push(provider.id);
      else u.coachOf.push(provider.id);
      await u.save();
    }
  }
  if (removeOld.length) {
    const removeOldPop = await UserModel.find({ _id: removeOld });
    for (let u of removeOldPop) {
      if (type === 'admins') u.adminOf = u.adminOf.filter(p => p.toString() !== provider.id);
      else u.coachOf = u.coachOf.filter(p => p.toString() !== provider.id);
      await u.save();
    }
  }
  if (type === 'admins') provider!.admins = usersId.map(id => Types.ObjectId(id));
  else provider!.coaches = usersId.map(id => Types.ObjectId(id));

  await provider!.save();
  return true;
}
