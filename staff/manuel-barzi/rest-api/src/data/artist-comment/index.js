const uuid = require('uuid/v4')
const fsp = require('fs').promises // WARN need node v10+
const path = require('path')

const artistComment = {
    file: 'artist-comments.json',

    add(comment) {
        const file = path.join(__dirname, this.file)

        return fsp.readFile(file)
            .then(content => {
                const comments = JSON.parse(content)

                comment.id = uuid()

                comments.push(comment)

                return fsp.writeFile(file, JSON.stringify(comments, null, 4))
            })
    },

    retrieve(id) {
        const file = path.join(__dirname, this.file)

        return fsp.readFile(file)
            .then(content => {
                const comments = JSON.parse(content)

                const comment = comments.find(comment => comment.id === id)

                if (typeof comment === 'undefined') return null

                comment.date = new Date(comment.date)

                return comment
            })
    },

    update(comment) {
        const file = path.join(__dirname, this.file)

        return fsp.readFile(file)
            .then(content => {
                const comments = JSON.parse(content)

                const index = comments.findIndex(_comment => _comment.id === comment.id)

                if (index < 0) throw Error(`comment with id ${comment.id} not found`)

                comments[index] = comment

                return fsp.writeFile(file, JSON.stringify(comments, null, 4))
            })
    },

    delete(id) {
        const file = path.join(__dirname, this.file)

        return fsp.readFile(file)
            .then(content => {
                const comments = JSON.parse(content)

                const index = comments.findIndex(comment => comment.id === id)

                if (index < 0) throw Error(`comment with id ${id} not found`)

                comments.splice(index, 1)

                return fsp.writeFile(file, JSON.stringify(comments, null, 4))
            })
    },

    find(criteria) {
        const file = path.join(__dirname, this.file)

        return fsp.readFile(file)
            .then(content => {
                const comments = JSON.parse(content)

                const filtered = comments.filter(comment => {
                    for (const key in criteria)
                        if (comment[key] !== criteria[key]) return false

                    return true
                })

                filtered.forEach(comment => comment.date = new Date(comment.date))

                return filtered
            })
    }
}

module.exports = artistComment