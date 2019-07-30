const dotenv = require('dotenv')
const data = require('devslides-data')
const { expect } = require('chai')
const logic = require('.')
const bcrypt = require('bcrypt')

dotenv.config()

const { models, mongoose } = data
const { User, Presentation } = models
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {
    let name, surname, username, email, password
    before(async () => {
        mongoose.connect(url, { useNewUrlParser: true })
        await User.deleteMany()
        await Presentation.deleteMany()
    })
    describe('users', () => {

        beforeEach(async () => {
            name = `name-${Math.random()}`,
                surname = `surname-${Math.random()}`,
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


                const res = await logic.registerUser(name, surname, username, email, password)

                expect(res).to.be.undefined

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
                    await logic.registerUser(name, surname, username, email, password)
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
                    await logic.registerUser(name, surname, username, email, password)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal(`User with username ${username} already exists`)
                }
            })
        })
        describe('authenticate user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct credentials', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).to.exist
                expect(id).to.be.a('string')

                expect(id).to.equal(user.id)
            })
            it('should fail on incorrect credentials', async () => {
                try {
                    await logic.authenticateUser(email, `wrong-password-${Math.random()}`)
                    throw Error('should not reach this point')
                }
                catch (err) {
                    expect(err.message).to.equal('Incorrect data')
                }
            })
        })

        describe('retrieve user', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)

                expect(_user.password).to.be.undefined
            })
        })

        describe('retrieve presentations', () => {
            let user

            beforeEach(async () => user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on correct id from existing user', async () => {

                const title1 = `title-${Math.random()}`
                const title2 = `title-${Math.random()}`
                await logic.createPresentation(user.id, title1)
                await logic.createPresentation(user.id, title2)

                const presentations = await logic.retrievePresentations(user.id)

                expect(presentations).to.exist
                expect(presentations[0].title).to.equal(title1)
                expect(presentations[1].title).to.equal(title2)
            })
        })

        describe('update user', () => {
            let user
            beforeEach(async () => user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))

            it('should succeed on update an existing user', async () => {

                const name = `name-${Math.random()}`
                const surname = `surname-${Math.random()}`
                const username = `surname-${Math.random()}`
                const email = `email-${Math.random()}@mail.com`
                const password = `password-${Math.random()}`

                const _user = await logic.updateUser(user.id, { name, surname, username, email, password })

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.username).to.equal(username)
                expect(_user.email).to.equal(email)
                expect(await bcrypt.compare(password, _user.password)).to.be.true

            })

        })
        describe('delete user', () => {
            let user
            it('should succeed on delete an user', async () => {
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                await logic.deleteUser(user.id, password)
                const _user = await User.findById(user.id).lean()
                expect(_user).to.equal(null)
            })

            it('should fail on delete an unexising user', async () => {
                try {
                    await logic.deleteUser(user.id, password)
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
            let user
            beforeEach(async () => user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) }))
            it('should create an empty presentation from an existing user', async () => {
                const title = `title-${Math.random()}`
                const res = await logic.createPresentation(user.id, title)
                expect(res).to.be.undefined

                const _user = await User.findById(user.id).lean()
                const [presentationid] = _user.presentations
                const presentation = await Presentation.findById(presentationid).lean()

                expect(presentation).to.exist
                expect(presentation.title).to.equal(title)
                expect(presentation.author.toString()).to.equal(user.id)
            })
            it('should fail when create a presentation with an existing title on user collection', async () => {
                const title = `title-${Math.random()}`
                await logic.createPresentation(user.id, title)
                try {
                    await logic.createPresentation(user.id, title)
                }
                catch (err) {
                    expect(err.message).to.equal(`Presentation with title ${title} already exist`)
                }
            })
            it('should delete a presentation from an existing user', async () => {
                const title = `title-${Math.random()}`
                await logic.createPresentation(user.id, `presentation-${Math.random()}`)
                await logic.createPresentation(user.id, title)

                let _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(2)
                const [presentationid] = _user.presentations

                await logic.deletePresentation(user.id, presentationid.toString())
                _user = await User.findById(user.id).lean()
                expect(_user.presentations).to.have.length(1)

                const presentation = await Presentation.findById(presentationid)

                expect(presentation).to.equal(null)
            })
        })
        describe('slide', () => {
            let user, style
            beforeEach(async () => {
                style = `.Slide-0{\nbackground-color: white \n}`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                await logic.createPresentation(user.id, `presentation-${Math.random()}`)
            })
            it('should create an empty slide from an existing presentation', async () => {

                const _user = await User.findById(user.id)
                const [presentation] = _user.presentations
                await logic.createSlide(user.id, presentation.toString(), style)
                const presentation_slides = await Presentation.findById(presentation).select('slides -_id').lean()
                const { slides } = presentation_slides
                const [slide] = slides

                expect(slide).to.exist
                expect(slide.style).to.equal(style)
            })

            it('should delete an slide from an existing presentation', async () => {

                const _user = await User.findById(user.id)
                const [presentation_Id] = _user.presentations
                await logic.createSlide(user.id, presentation_Id.toString(), style)
                let presentation_Slides = await Presentation.findById(presentation_Id).select('slides -_id').lean()
                const { slides: [slide] } = presentation_Slides
                await logic.deleteSlide(user.id, presentation_Id.toString(), slide._id.toString())
                presentation_Slides = await Presentation.findById(presentation_Id)

                expect(presentation_Slides.slides).to.have.length(1)
            })
        })
        describe('element', () => {
            let user, presentation, style, type, content
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })
                await logic.createPresentation(user.id, `presentation-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [_presentation] } = _user
                presentation = _presentation
                await logic.createSlide(user.id, presentation.toString(), style)
            })
            it('should create an element from an existing slide', async () => {

                let presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide] } = presentation_slides

                await logic.createElement(user.id, presentation.toString(), slide._id.toString(), style, type, content)

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
                await logic.createElement(user.id, presentation.toString(), slide._id.toString(), style, type, content)

                presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slide_element] } = presentation_slides
                const { elements: [element] } = slide_element
                await logic.deleteElement(user.id, presentation.toString(), slide._id.toString(), element._id.toString())

                presentation_slides = await Presentation.findById(presentation).lean()
                const { slides: [slideDeletedElement] } = presentation_slides
                const { elements } = slideDeletedElement

                expect(elements).to.exist
                expect(elements).to.have.length(0)
            })
        })
        describe('Retrieve JSON presentation', () => {
            let user, presentation, slidesQuantity, elementsQuantity, content, type, style
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `.Slide-0{\nbackground-color: white \n}`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })

                await logic.createPresentation(user.id, `Presentation-to-JSON-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [presentationId] } = _user

                presentation = await Presentation.findById(presentationId).lean()
                slidesQuantity = Math.floor(Math.random() * 1) + 10
                elementsQuantity = Math.floor(Math.random() * 5) + 10
                for (var index = 0; index < slidesQuantity; index++) {
                    await logic.createSlide(user.id, presentation._id.toString(), style)

                    presentation = await Presentation.findById(presentationId).lean()

                    for (let i = 0; i < elementsQuantity; i++) {
                        const { slides } = presentation
                        await logic.createElement(user.id, presentation._id.toString(), slides[index]._id.toString(), style, type, content)
                    }
                }
            })
            it('should retrieve presentations and its childrens JSONified', async () => {
                const objectPresentation = await logic.retrievePresentation(user.id, presentation._id.toString())

                expect(objectPresentation.slides).to.have.length(slidesQuantity+1)
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
            let user, presentation, content, type, style, slides
            beforeEach(async () => {
                content = `Lorem-ipsum-${Math.random()}`
                type = `textbox-${Math.random()}`
                style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                user = await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 5) })

                await logic.createPresentation(user.id, `Presentation-update-${Math.random()}`)
                const _user = await User.findById(user.id)
                const { presentations: [presentationId] } = _user

                presentation = await Presentation.findById(presentationId).lean()
                await logic.createSlide(user.id, presentation._id.toString(), style)
                await logic.createSlide(user.id, presentation._id.toString(), style)

                presentation = await Presentation.findById(presentationId).lean()
                slides = presentation.slides
                await logic.createElement(user.id, presentation._id.toString(), slides[0]._id.toString(), style, type, content)
                await logic.createElement(user.id, presentation._id.toString(), slides[1]._id.toString(), style, type, content)

                presentation = await Presentation.findById(presentationId)
                slides = presentation.slides
            })

            it('should update a presentation title', async () => {
                const title = `Presentation-titleUpdate-${Math.random()}`
                await logic.updatePresentationTitle(user.id, presentation._id.toString(), title)

                presentation = await Presentation.findById(presentation._id.toString()).lean()
                expect(presentation.title).to.equal(title)
                expect(presentation.author.toString()).to.equal(user.id)
            })

            it('should update a presentation style', async () => {
                const style = `{ background-color: red; border: 1px solid #${Math.random()} }`
                await logic.updateSlideStyle(user.id, presentation._id.toString(), slides[0]._id.toString(), style)

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
                await logic.updateSlide(user.id, presentation._id.toString(), updateSlides, updateElements)

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