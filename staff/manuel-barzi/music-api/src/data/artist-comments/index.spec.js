'use strict'

const expect = require('expect')
const path = require('path')
const fsp = require('fs').promises
const artistComment = require('.')
const uuid = require('uuid')

describe('artist comments data', () => {
    const file = path.join(__dirname, artistComment.file)

    beforeEach(() => fsp.writeFile(file, JSON.stringify([])))

    describe('__load__', () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            }
        ]

        beforeEach(() => fsp.writeFile(file, JSON.stringify(comments)))

        it('should succeed on correct file path', () =>
            artistComment.__load__(file)
                .then(_comments => {
                    expect(_comments).toBeDefined()
                    expect(_comments.length).toBe(comments.length)

                    _comments.forEach(({ id, userId, artistId, text, date }, index) => {
                        expect(id).toBe(comments[index].id)
                        expect(userId).toBe(comments[index].userId)
                        expect(artistId).toBe(comments[index].artistId)
                        expect(text).toBe(comments[index].text)
                        expect(date).toBe(comments[index].date.toISOString())
                    })
                })
        )
    })

    describe('__save__', () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            }
        ]

        it('should succeed on correct file path', () =>
            artistComment.__save__(file, comments)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(_comments => {
                    expect(_comments).toBeDefined()
                    expect(_comments.length).toBe(comments.length)

                    _comments.forEach(({ id, userId, artistId, text, date }, index) => {
                        expect(id).toBe(comments[index].id)
                        expect(userId).toBe(comments[index].userId)
                        expect(artistId).toBe(comments[index].artistId)
                        expect(text).toBe(comments[index].text)
                        expect(date).toBe(comments[index].date.toISOString())
                    })
                })
        )
    })

    describe('add', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        it('should succeed on correct data', () =>
            artistComment.add(comment)
                .then(() => {
                    expect(comment.id).toBeDefined()

                    return fsp.readFile(file)
                })
                .then(content => JSON.parse(content))
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, userId, artistId, text, date }] = comments

                    expect(id).toBe(comment.id)
                    expect(userId).toBe(comment.userId)
                    expect(artistId).toBe(comment.artistId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        )
    })

    describe('retrieve', () => {
        const comment = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // artistComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct commend id', () =>
            artistComment.retrieve(comment.id)
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(artistId).toBe(comment.artistId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date.toString()).toBe(comment.date.toString())
                })
        )
    })

    describe('update', () => {
        const comment = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // artistComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct data', () => {
            comment.text += '-NEW'

            return artistComment.update(comment)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(comments => comments.find(_comment => _comment.id === comment.id))
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(artistId).toBe(comment.artistId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        })
    })

    describe('remove', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // artistComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct comment id', () =>
            artistComment.remove(comment.id)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(comments => comments.find(_comment => _comment.id === comment.id))
                .then(comment => expect(comment).toBeUndefined())
        )
    })

    // TODO test remove all

    describe('find', () => {
        const comment = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment2 = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment3 = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment4 = {
            id: uuid(),
            artistId: comment2.artistId,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment5 = {
            id: uuid(),
            artistId: comment2.artistId,
            userId: `userId-5-${Math.random()}`,
            text: comment4.text,
            date: new Date
        }

        beforeEach(() =>
            // artistComment.add(comment) // FATAL each test should test ONE unit
            //     .then(() => artistComment.add(comment2))
            //     .then(() => artistComment.add(comment3))
            //     .then(() => artistComment.add(comment4))
            //     .then(() => artistComment.add(comment5))
            fsp.writeFile(file, JSON.stringify([comment, comment2, comment3, comment4, comment5]))
        )

        it('should succeed on correct criteria by id', () =>
            artistComment.find({ id: comment2.id })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, artistId, userId, text, date }] = comments

                    expect(id).toBe(comment2.id)
                    expect(artistId).toBe(comment2.artistId)
                    expect(userId).toBe(comment2.userId)
                    expect(text).toBe(comment2.text)
                    expect(date).toEqual(comment2.date)
                })
        )

        it('should succeed on correct criteria by artist id', () =>
            artistComment.find({ artistId: comment2.artistId })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(3)

                    const [_comment, _comment2, _comment3] = comments

                    expect(_comment.id).toBe(comment2.id)
                    expect(_comment.artistId).toBe(comment2.artistId)
                    expect(_comment.userId).toBe(comment2.userId)
                    expect(_comment.text).toBe(comment2.text)
                    expect(_comment.date).toEqual(comment2.date)

                    expect(_comment2.id).toBe(comment4.id)
                    expect(_comment2.artistId).toBe(comment4.artistId)
                    expect(_comment2.userId).toBe(comment4.userId)
                    expect(_comment2.text).toBe(comment4.text)
                    expect(_comment2.date).toEqual(comment4.date)

                    expect(_comment3.id).toBe(comment5.id)
                    expect(_comment3.artistId).toBe(comment5.artistId)
                    expect(_comment3.userId).toBe(comment5.userId)
                    expect(_comment3.text).toBe(comment5.text)
                    expect(_comment3.date).toEqual(comment5.date)
                })
        )

        it('should succeed on correct criteria by artist id and comment', () =>
            artistComment.find({ artistId: comment2.artistId, text: comment4.text })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(2)

                    const [_comment, _comment2] = comments

                    expect(_comment.id).toBe(comment4.id)
                    expect(_comment.artistId).toBe(comment4.artistId)
                    expect(_comment.userId).toBe(comment4.userId)
                    expect(_comment.text).toBe(comment4.text)
                    expect(_comment.date).toEqual(comment4.date)

                    expect(_comment2.id).toBe(comment5.id)
                    expect(_comment2.artistId).toBe(comment5.artistId)
                    expect(_comment2.userId).toBe(comment5.userId)
                    expect(_comment2.text).toBe(comment5.text)
                    expect(_comment2.date).toEqual(comment5.date)
                })
        )
    })

    after(() => fsp.writeFile(file, JSON.stringify([])))
})