import mongoose from 'mongoose'
import prompts from 'prompts'
import models from './models'

const { User, Note } = models;

(async () => {
    try {
        // init

        await mongoose.connect('mongodb://localhost/mongoose-test', { useNewUrlParser: true })

        console.log('connected to database')

        // use

        await User.deleteMany()
        await Note.deleteMany()

        const sho = new User({ name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: '123' })

        await sho.save()

        const _sho = new User({ name: 'Manuel', surname: 'Hyde', email: 'manuelhyde@gmail.com', password: '123' })

        await _sho.save()

        for (let i = 0; i < 10; i++) {
            const note = new Note({ text: `Hola, Mundo! ${Math.random()}`, author: sho.id })

            await note.save()
        }

        for (let i = 0; i < 10; i++) {
            const note = new Note({ text: `Me persiguen! ${Math.random()}`, author: _sho.id })

            await note.save()
        }

        for (let i = 0; i < 10; i++) {
            const note = new Note({ text: `Hola, Mundo Privado Misterioso Oculto Mio Propio! ${Math.random()}`, author: sho.id })

            sho.notes.push(note)

            await sho.save()
        }

        for (let i = 0; i < 10; i++) {
            const note = new Note({ text: `Me persiguen, me persiguen!!!! ${Math.random()}`, author: _sho.id })

            _sho.notes.push(note)

            await _sho.save()
        }

        // list public notes



        await mongoose.disconnect()
    } catch (error) {
        console.error(error)
    }
})()