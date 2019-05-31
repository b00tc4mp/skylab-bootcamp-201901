
  // describe('retrieve user', function() {
  //   const users: any = [];

  //   this.timeout(5000);

  //   beforeEach(async () => {
  //     for (let ii = 0, ll = random(15); ii < ll; ii++) {
  //       const user = randomUser();
  //       const hashPassword = await bcrypt.hash(user.password!, 12);
  //       users.push(await UserModel.create({ ...user, password: hashPassword }));
  //     }
  //   });

  //   it('should retrieve a random user', async () => {
  //     const _user = random(users);
  //     const user = await usersLogic.retrieve(_user.id);
  //     expect(user).not.to.be.null;
  //     userExpectations(user);
  //     expect(user.name).to.be.equal(_user.name);
  //     expect(user.surname).to.be.equal(_user.surname);
  //     expect(user.email).to.be.equal(_user.email);
  //   });

  //   it('should fail if id is wrong', async () => {
  //     const _user = random(users);
  //     await UserModel.findByIdAndDelete(_user.id);
  //     await expect(usersLogic.retrieve(_user.id)).to.be.rejectedWith(LogicError, 'id not found');
  //   });

  //   describe('params bad format', () => {
  //     it('should fail if is not a correct ObjectId string', async () => {
  //       await expect(usersLogic.retrieve(faker.random.alphaNumeric())).to.be.rejectedWith(
  //         ValidationError,
  //         'id is not correct'
  //       );
  //     });
  //   });
  // });