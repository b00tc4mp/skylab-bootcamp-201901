import models from '../data/models'

const { User, Note } = models

const logic = {
    addPublicNote(userId, text) {
        // TODO validate inputs

        // TODO implement logic

        return (async() => {
            await Note.create({ author: userId, text })
        })()
    },

    removePublicNote(userId, notedId) {
        // TODO validate inputs

        // TODO implement logic
    },

    listPublicNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    },

    addPrivateNote(userId, text) {
        // TODO validate inputs

        // TODO implement logic
    },

    removePrivateNote(userId, noteId) {
        // TODO validate inputs

        // TODO implement logic
    },

    listPrivateNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    }
}

export default logic