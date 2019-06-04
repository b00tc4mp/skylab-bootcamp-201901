const dotenv = require('dotenv')
const data = require('devslides-data')
const { expect } = require('chai')
const api = require('.');
const bcrypt = require('bcrypt')

dotenv.config()

const { models, mongoose } = data
const { User, Presentation } = models;
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('api', () => {
    let name, surname, username, email, password
    before(async () => {
        mongoose.connect('mongodb://localhost/devslides-api', { useNewUrlParser: true })
        await User.deleteMany()
        await Presentation.deleteMany()
    })
    describe('users', () => {

        beforeEach(() => {
            name = `name-${Math.random()}`,
                surname = `appsurname-${Math.random()}`,
                username = `username-${Math.random()}`,
                email = `email-${Math.random()}@mail.com`,
                password = `password-${Math.random()}`

        })

        describe('register user', () => {
            beforeEach(() => {
                username = `username-${Math.random()}`,
                    email = `email-${Math.random()}@mail.com`
            })
            it('should succeed on correct data', async () => {


                const res = await api.registerUser(name, surname, username, email, password)

                expect(res.message).to.equal('Ok, user registered.')

                const users = await User.find()

                expect(users).to.exist
                expect(users).to.have.lengthOf(1)

                const [user] = users
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.username).to.equal(username)
                expect(user.email).to.equal(email)

                expect(user.password).to.exist

                expect(await bcrypt.compare(password, user.password)).to.be.true
            })

            it('should fail on existing email', async () => {
                email = 'used-email@mail.com'
                await User.create({ name, surname, username, email, password })
                try {
                    debugger
                    await api.registerUser(name, surname, username, email, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal(`User with email ${email} already exists`)
                }
            })

            it('should fail on existing username', async () => {
                username = 'used-username'
                await User.create({ name, surname, username, email, password })
                email = `email-${Math.random()}@mail.com`
                try {
                    await api.registerUser(name, surname, username, email, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal(`User with username ${username} already exists`)
                }
            })
        })
        describe('authenticate user', () => {

            beforeEach(async () => await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct email', async () => {
                const token = await api.authenticateUser(email, password)

                expect(token).to.exist
                expect(token).to.be.a('string')
            })

            it('should succeed on correct username', async () => {
                const token = await api.authenticateUser(username, password)

                expect(token).to.exist
                expect(token).to.be.a('string')
            })

            it('should fail on incorrect credentials', async () => {
                try {
                    await api.authenticateUser(email, `wrong-password-${Math.random()}`)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal('Incorrect data')
                }
            })
        })

        describe('retrieve user', () => {

            beforeEach(async () => await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct id from existing user', async () => {
                const token = await api.authenticateUser(username, password)
                const _user = await api.retrieveUser(token)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)

                expect(_user.password).to.be.undefined
            })
        })
        describe('update user', () => {
            let token
            beforeEach(async () => {
                await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)
            })

            it('should succeed on update an existing user', async () => {

                const _name = `name-${Math.random()}`
                const _surname = `surname-${Math.random()}`
                const _username = `surname-${Math.random()}`
                const _email = `email-${Math.random()}@mail.com`
                const _password = `password-${Math.random()}`

                const _user = await api.updateUser(token, { name: _name, surname: _surname, username: _username, email: _email, password: _password })
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(_name)
                expect(_user.surname).to.equal(_surname)
                expect(_user.username).to.equal(_username)
                expect(_user.email).to.equal(_email)
                expect(await bcrypt.compare(_password, _user.password)).to.be.true

            })

        })
        describe('delete user', () => {
            let user, token
            beforeEach(async () => {
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)
            })

            it('should succeed on delete an user', async () => {
                await api.deleteUser(token, password)
                const _user = await User.findById(user.id).lean()
                expect(_user).to.equal(null)

            })

            it('should fail on delete an unexising user', async () => {
                try {
                    await api.deleteUser(token, password)
                    await api.deleteUser(token, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal('User to delete doesnt exist')
                }

            })

        })
    })
    describe('Presentation elements', () => {
        beforeEach(async () => {

            name = `name-${Math.random()}`,
                surname = `surname-${Math.random()}`,
                username = `username-${Math.random()}`,
                email = `email-${Math.random()}@mail.com`,
                password = `password-${Math.random()}`

        })
        describe('presentation', () => {
            let user, token
            beforeEach(async () => {
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)
            })
            it('should create an empty presentation from an existing user', async () => {
                debugger
                const title = `title-${Math.random()}`
                const res = await api.createPresentation(token, title)
                expect(res.message).to.equal(`Created new presentation ${title}`)
                debugger
                const _user = await User.findById(user.id).lean()
                const [presentationid] = _user.presentations
                const presentation = await Presentation.findById(presentationid).lean()

                expect(presentation).to.exist
                expect(presentation.title).to.equal(title)
                expect(presentation.author.toString()).to.equal(user.id)
            })
            it('should fail when create a presentation with an existing title on user collection', async () => {
                const title = `title-${Math.random()}`
                await api.createPresentation(token, title)
                try {
                    await api.createPresentation(token, title)
                }
                catch (err) {
                    expect(err.message).to.equal(`Presentation with title ${title} already exist`)
                }
            })
            it('should delete a presentation from an existing user', async () => {
                const title = `title-${Math.random()}`
                await api.createPresentation(token, `presentation-${Math.random()}`)
                await api.createPresentation(token, title)

                let _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(2)
                const [presentationid] = _user.presentations

                await api.deletePresentation(token, presentationid.toString())
                _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(1)

                const presentation = await Presentation.findById(presentationid)

                expect(presentation).to.equal(null)
            })
        })
        describe('slide', () => {
            let user, style, token
            beforeEach(async () => {
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)
                await api.createPresentation(token, `presentation-${Math.random()}`)
            })
            it('should create an empty slide from an existing presentation', async () => {

                const _user = await User.findById(user.id).lean()
                debugger
                const [presentation] = _user.presentations
                await api.createSlide(token, presentation.toString(), style)
                const presentation_Slides = await Presentation.findById(presentation).select('slides -_id').lean()
                const { slides: [slide] } = presentation_Slides

                expect(slide).to.exist
                expect(slide.style).to.equal(style)
            })

            it('should delete an slide from an existing presentation', async () => {

                const _user = await User.findById(user.id).lean()
                const [presentation_Id] = _user.presentations
                await api.createSlide(token, presentation_Id.toString(), style)
                debugger
                let presentation_Slides = await Presentation.findById(presentation_Id).select('slides -_id').lean()
                const { slides: [slide] } = presentation_Slides
                await api.deleteSlide(token, presentation_Id.toString(), slide._id.toString())
                presentation_Slides = await Presentation.findById(presentation_Id)
                debugger
                expect(presentation_Slides.slides).to.have.length(0)
            })
        })
        describe('element', () => {
            let user, presentation, style, type, content, token
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)
                await api.createPresentation(token, `presentation-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [_presentation] } = _user
                presentation = _presentation
                await api.createSlide(token, presentation.toString(), style)
            })
            it('should create an element from an existing slide', async () => {

                let presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide] } = presentation_slides

                await api.createElement(token, presentation.toString(), slide._id.toString(), style, type, content)

                presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide_element] } = presentation_slides
                const { elements: [element] } = slide_element

                expect(element).to.exist
                expect(element.type).to.equal(type)
                expect(element.style).to.equal(style)
            })
            it('should delete an element from an existing element', async () => {

                let presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide] } = presentation_slides
                await api.createElement(token, presentation.toString(), slide._id.toString(), style, type, content)

                presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide_element] } = presentation_slides
                const { elements: [element] } = slide_element
                await api.deleteElement(token, presentation.toString(), slide._id.toString(), element._id.toString())

                presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slideDeletedElement] } = presentation_slides
                const { elements } = slideDeletedElement

                expect(elements).to.exist
                expect(elements).to.have.length(0)
            })
        })
        describe('Retrieve JSON presentation', () => {
            let user, presentation, slidesQuantity, elementsQuantity, content, type, style, token
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)

                await api.createPresentation(token, `Presentation-to-JSON-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [presentationId] } = _user

                presentation = await Presentation.findById(presentationId).lean()
                slidesQuantity = Math.floor(Math.random() * 1) + 10
                elementsQuantity = Math.floor(Math.random() * 5) + 10
                for (var index = 0; index < slidesQuantity; index++) {
                    await api.createSlide(token, presentation._id.toString(), style)

                    presentation = await Presentation.findById(presentationId).lean()

                    for (let i = 0; i < elementsQuantity; i++) {
                        const { slides } = presentation
                        await api.createElement(token, presentation._id.toString(), slides[index]._id.toString(), style, type, content)
                    }
                }
            })
            it('should retrieve presentations and its childrens JSONified', async () => {
                const objectPresentation = await api.retrievePresentation(token, presentation._id.toString())

                expect(objectPresentation.slides).to.have.length(slidesQuantity)
                for (let i = 0; i < slidesQuantity; i++) {
                    expect(objectPresentation.slides[i].elements).to.have.length(elementsQuantity)
                    expect(objectPresentation.slides[i].style).to.equal(style)
                    for (let j = 0; j < elementsQuantity; j++) {
                        expect(objectPresentation.slides[i].elements[j].type).to.equal(type)
                        expect(objectPresentation.slides[i].elements[j].style).to.equal(style)
                        expect(objectPresentation.slides[i].elements[j].content).to.equal(content)
                    }
                }
            })
        })
        describe('Presentation Update', () => {
            let user, presentation, content, type, style, slides, token
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                token = await api.authenticateUser(username, password)

                await api.createPresentation(token, `Presentation-update-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [presentationId] } = _user

                presentation = await Presentation.findById(presentationId).lean()
                await api.createSlide(token, presentation._id.toString(), style)
                await api.createSlide(token, presentation._id.toString(), style)

                presentation = await Presentation.findById(presentationId).lean()
                slides = presentation.slides
                await api.createElement(token, presentation._id.toString(), slides[0]._id.toString(), style, type, content)
                await api.createElement(token, presentation._id.toString(), slides[1]._id.toString(), style, type, content)

                presentation = await Presentation.findById(presentationId)
                slides = presentation.slides
            })

            it('should update a presentation title', async () => {
                const title = `Presentation-titleUpdate-${Math.random()}`
                await api.updatePresentationTitle(token, presentation._id.toString(), title)

                presentation = await Presentation.findById(presentation._id.toString()).lean()
                expect(presentation.title).to.equal(title)
                expect(presentation.author.toString()).to.equal(user.id)
            })

            it('should update a presentation style', async () => {
                const style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                const res = await api.updateSlideStyle(token, presentation._id.toString(), slides[0]._id.toString(), style)
                expect(res.message).to.equal('Ok, style updated.')
                presentation = await Presentation.findById(presentation._id.toString()).lean()
                expect(presentation.slides[0]._id.toString()).to.equal(slides[0]._id.toString())
                expect(presentation.slides[0].style).to.equal(style)
            })

            it('should update multiple slides data and their childs', async () => {
                const element1 = {
                    _id: slides[0].elements[0]._id,
                    type: `div-${Math.random()}`,
                    style: `{ background-color: red; border: 1px solid #${Math.random()} }`,
                    content: `Updated-Lorem-ipsum-${Math.random()}`
                }
                const element2 = {
                    _id: slides[1].elements[0]._id,
                    type: `div-${Math.random()}`,
                    style: `{ background-color: red; border: 1px solid #${Math.random()} }`,
                    content: `Updated-Lorem-ipsum-${Math.random()}`
                }
                const updateElements = [element1, element2]
                const updateSlides = [slides[0].id, slides[1].id]
                await api.updateSlide(token, presentation._id.toString(), updateSlides, updateElements)

                presentation = await Presentation.findById(presentation._id.toString()).lean()
                slides = presentation.slides

                expect(slides[0].elements[0]._id.toString()).to.equal(element1._id.toString())
                expect(slides[0].elements[0].type).to.equal(element1.type)
                expect(slides[0].elements[0].style).to.equal(element1.style)
                expect(slides[0].elements[0].content).to.equal(element1.content)

                expect(slides[1].elements[0]._id.toString()).to.equal(element2._id.toString())
                expect(slides[1].elements[0].type).to.equal(element2.type)
                expect(slides[1].elements[0].style).to.equal(element2.style)
                expect(slides[1].elements[0].content).to.equal(element2.content)
            })
        })
    })
    after(async () => mongoose.disconnect(true))
})
