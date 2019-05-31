// async retrieve(id: string | Schema.Types.ObjectId) {
//   if (typeof id === 'string' && !isMongoId(id)) throw new ValidationError('id is not correct');
//   const user = await UserModel.findById(id);
//   if (!user) throw new LogicError('id not found');
//   return user;
// },