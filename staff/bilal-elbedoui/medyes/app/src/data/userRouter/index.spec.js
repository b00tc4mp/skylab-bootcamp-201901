const { Field, EventType, Organization, User, Event, QueAns, Purchase, mongoose } = require('DATA')
const { expect } = require('chai')


const userRouter = require('.')


describe('USERROUTER', () => {

    (async () => {
        try {
            mongoose.connect('mongodb://localhost/project-test', { useNewUrlParser: true, useCreateIndex: true })

            console.log('Connected to the project database react...')
        } catch (error) {
            console.log('Cannot connecte to the db...')
        }
    })()


    describe('USERS', () => {


        let organizationName, organizationPhone, organizationMail, organizationAddress, password


        describe('Create Admin User', () => {
            let fullname
            let email
            let role
            let organization
            let phoneNumber
            let situation

            beforeEach(async () => {

                await Organization.deleteMany()
                await User.deleteMany()

                // organizationName = `Enterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // organizationPhone = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // organizationMail = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmal.com`
                // organizationAddress = `adresssss-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                // password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                // orga = await logic.createOrganization({ organizationName, organizationPhone, organizationMail, organizationAddress, password })
            })
            it('Should create a representant of random company', async () => {
                fullname = `Carlos-${Math.floor(Math.random() * (1000 - 1)) + 1}tonto`
                email = `emailenterprise-${Math.floor(Math.random() * (1000 - 1)) + 1}@gmail.com`
                organization = '5cf0f1cd0f0c8e21b8447b49'
                phoneNumber = `654896321-${Math.floor(Math.random() * (1000 - 1)) + 1}`
                situation = 'student'
                password = `BBbb11..-${Math.floor(Math.random() * (1000 - 1)) + 1}`

                role = 'normal'
                debugger

                const userAdmin = await userRouter.create({ fullname, email, role, organization, phoneNumber, situation, password })

                expect(userAdmin.fullname).to.equal(fullname)


            })

            // const usersRep = await User.find()

            // const [user] = usersRep

            // expect(user.fullname).to.equal(fullname)
            // expect(user.email).to.equal(email)
            // expect(user.role).to.equal(role)
            // expect(user.phoneNumber).to.equal(phoneNumber)
            // expect(user.situation).to.equal(situation)
            // expect(user.password).to.exist

        })
    })
})

