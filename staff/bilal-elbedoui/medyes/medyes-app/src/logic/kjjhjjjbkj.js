// import logic from './'
// import {mongoose} from 'DATA'

// describe('Logic', ()=>{

//     mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true })


//     describe('USERS', () => {

//         let organizationName, organizationPhone, organizationMail, organizationAddress, password

//         let fullname
//         let email
//         let role
//         let organization
//         let phoneNumber
//         let situation

//         beforeEach(async () => {

//             // await Organization.deleteMany()
//             // await User.deleteMany()

//             // organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
//             // organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
//             // organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
//             // organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
//             // password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

//             // orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })

//             fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
//             email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
//             organization = '5cf0f1cd0f0c8e21b8447b49'
//             phoneNumber = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
//             situation = 'student'
//             password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`
//         })
//         describe('Create Admin User', () => {

//             it('Should create a representant of random company', async () => {
//                 role = 'admin'

//                 const userAdmin = await logic.registerUser({ fullname, email, role, organization, phoneNumber, situation, password })

//                 expect(userAdmin).toBeDefined()
          

                // const usersRep = await User.find()

                // const [user] = usersRep

                // expect(user.fullname).to.equal(fullname)
                // expect(user.email).to.equal(email)
                // expect(user.role).to.equal(role)
                // expect(user.phoneNumber).to.equal(phoneNumber)
                // expect(user.situation).to.equal(situation)
                // expect(user.password).to.exist
            // })
        //     it('Should fail if the user role is normal', async () => {
        //         role = 'normal';
        //         let userAdmin
        //         try {
        //             userAdmin = await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password })
        //         } catch (error) {
        //             expect(error.message).to.equal('You should not have a Organization ID')
        //             expect(userAdmin).to.be.undefined
        //         }
        //     })
        //     it('should fail if the user provide us a none correct Organization ID', async () => {
        //         try {
        //             role = 'admin'

        //             await logic.createUser({ fullname, email, role, organization: '5cf61de6bf73b3409c82f329', phoneNumber, situation, password })
        //         } catch (error) {
        //             expect(error.message).to.exist
        //             expect(error.message).to.equal('Organization not found')
        //         }
        //     })
        //     it('Should fail is the information provided is not accepted by the validator', async () => {
        //         try {
        //             role = 'admin'

        //             await logic.createUser({ fullname, email, role, organization, phoneNumber, situation, password: 'bbnm' })
        //         } catch (error) {
        //             expect(error.message).to.exist
        //             expect(error.message).to.equal('"password" must meet password complexity requirements')
        //         }
        //     })
        //     it('Should fail is the user already exists', async () => {
        //         role = 'admin'

        //         await logic.createUser({ fullname, email: 'usesexisting@gmail.es', role, organization, phoneNumber, situation, password })
        //         try {

        //             await logic.createUser({ fullname, email: 'usesexisting@gmail.es', role, organization, phoneNumber, situation, password })
        //         } catch (error) {

        //             expect(error.message).to.be.not.undefined
        //             expect(error.message).to.equal(`The user with the email usesexisting@gmail.es already exists`)
        //         }
        //     })
        //     it('should fail if the user situation does not match with the options', async () => {
        //         try {
        //             role = 'admin'
        //             await logic.createUser({ fullname, email, role, organization, phoneNumber, situation: 'nonCorrectsituation', password })
        //         } catch (error) {

        //             expect(error.message).to.be.not.undefined
        //             expect(error.message).to.equal('the value introduced does not match with the options')
        //         }
        //     })
        // })
        // describe('Create Normal User', () => {


        //     it('should create a normal user', async () => {
        //         const normalUser = await User.create({ fullname, email, role: 'normal', phoneNumber, situation, password })

        //         expect(normalUser).to.exist
        //         expect(normalUser.role).to.equal('normal')
        //         expect(normalUser).to.be.an('object')
        //         debugger
        //         const user = await User.find()

        //         role = 'normal'
        //         const [userResult] = user

        //         expect(userResult.fullname).to.equal(fullname)
        //         expect(userResult.email).to.equal(email)
        //         expect(userResult.role).to.equal(role)
        //         expect(userResult.phoneNumber).to.equal(phoneNumber)
        //         expect(userResult.situation).to.equal(situation)
        //         expect(userResult.password).to.exist
        //     })
        //     it('should fail if the user situation does not match with the options', async () => {
        //         try {
        //             await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation: 'nonCorrectsituation', password })
        //         } catch (error) {
        //             expect(error.message).to.be.not.undefined
        //             expect(error.message).to.equal('the value introduced does not match with the options')
        //         }
        //     })
        //     it('Should fail if a normal user provide us an Organization ID', async () => {
        //         try {
        //             await logic.createUser({ fullname, email, role: 'normal', organization, phoneNumber, situation, password })
        //         } catch (error) {
        //             expect(error.message).to.be.not.undefined
        //             expect(error.message).to.equal('You should not have a Organization ID')
        //         }
        //     })

        // })
        // describe('Authenticate Admin USer', () => {
        //     beforeEach(async () => {
        //         const orga = await logic.createOrganization({ organizationName: 'testName56', organizationPhone: '123test456', organizationMail: 'testemail@gmila.com', organizationAddress: 'CAlle roc borronat', password: 'BBbb11..' })
        //         const user = await logic.createUser({ fullname, email, role: 'admin', organization: orga.id, phoneNumber, situation, password })
        //     })

        //     it('Should succed if the credentials are correct', async () => {
        //         const user = await logic.authenticateUser({ email, password })

        //         expect(user).to.exist
        //         expect(user).to.be.an('object')
        //     })
        //     it('Should fail if the is not properly written', async () => {
        //         try {
        //             const email = 'nowrittenprop@.com'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal('"email" must be a valid email')
        //         }
        //     })
        //     it('Should fail if the email does not exist', async () => {
        //         try {
        //             const email = 'holhola@gmail.com'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
        //         }
        //     })
        //     it('Should fail if the password is not correct', async () => {
        //         try {
        //             password = 'LLbb33..'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal('Wrong credentials!')
        //         }
        //     })
        // })
        // describe('Authenticate Normal USer', () => {
        //     beforeEach(async () => {
        //         const user = await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation, password })
        //     })

        //     it('Should succed if the credentials are correct', async () => {
        //         const user = await logic.authenticateUser({ email, password })

        //         expect(user).to.exist
        //         expect(user).to.be.an('object')
        //     })
        //     it('Should fail if the is not properly written', async () => {
        //         try {
        //             const email = 'nowrittenprop@.com'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal('"email" must be a valid email')
        //         }
        //     })
        //     it('Should fail if the email does not exist', async () => {
        //         try {
        //             const email = 'holhola@gmail.com'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`User with the email holhola@gmail.com doesn't exist`)
        //         }
        //     })
        //     it('Should fail if the password is not correct', async () => {
        //         try {
        //             password = 'LLbb33..'
        //             const user = await logic.authenticateUser({ email, password })
        //         } catch (error) {
        //             expect(error).to.exist
        //             expect(error.message).to.equal('Wrong credentials!')
        //         }
        //     })
        // })
        // describe('Retrieve User', () => {
        //     let user
        //     beforeEach(async () => {
        //         user = await logic.createUser({ fullname, email, role: 'normal', phoneNumber, situation, password })
        //     })
        //     it('Should Retrieve a user that have been created before', async () => {
        //         const userRetrieved = await logic.retrieveUser(user.id)

        //         expect(userRetrieved).to.exist
        //         expect(userRetrieved.email).to.equal(email)
        //         expect(userRetrieved.role).to.equal(role)
        //         expect(userRetrieved.situation).to.equal(situation)
        //     })
//          })
//     })
// })