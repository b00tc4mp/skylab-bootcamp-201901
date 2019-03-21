import osiApi from '../osi-api'

const logic = {

    __userApiToken__: null,

    /**
     * Checks if user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__userApiToken__ = null
    },

    register(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(`${name} should be a string`)

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} should be a string`)

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} should be a string`)

        if (!passwordConfirm.trim().length) throw Error('passwordConfirm cannot be empty')

        return osiApi.register(name, surname, email, password, passwordConfirm)
    },

    login(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return osiApi.login(email, password)
            .then(token => this.__userApiToken__ = token)
    },

    retrieve() {
        return osiApi.retrieve(this.__userApiToken__)
    },

    update(data) {
        if (!data) throw Error('data must exist')

        if (data.constructor !== Object) throw TypeError(`${data} should be an object`)

        return osiApi.update(this.__userApiToken__, data)
    },

    remove() {
        return osiApi.remove(this.__userApiToken__)
    },

    createRootDir() {
        return osiApi.createRootDir(this.__userApiToken__)
    },

    createDir(dirName) {
        return osiApi.createDir(this.__userApiToken__, dirName)
    },

    retrieveDir(dirPath) {
        return osiApi.retrieveDir(this.__userApiToken__, dirPath)
    },

    createFile(fileContent, filePath) {
        return osiApi.createFile(this.__userApiToken__, fileContent, filePath)
    },

    retrieveFile(filePath) {
        return osiApi.retrieveFile(this.__userApiToken__, filePath)
    },

    updateFile(filePath, fileContent) {
        return osiApi.updateFile(this.__userApiToken__, filePath, fileContent)
    },

    updatePositions(path, position) {
        return osiApi.updatePositions(this.__userApiToken__, path, position)
    },

    removeDir(dirPath) {
        return osiApi.removeDir(this.__userApiToken__, dirPath)
    },

    removeFile(filePath) {
        return osiApi.removeFile(this.__userApiToken__, filePath)
    },

    rename(oldName, newName) {
        return osiApi.rename(this.__userApiToken__, oldName, newName)
    },

    retrieveLevel(dirPath) {
        return osiApi.retrieveLevel(this.__userApiToken__, dirPath)
    },

    moveFile(oldPath, newPath) {
        return osiApi.moveFile(this.__userApiToken__, oldPath, newPath)
    },

    moveDir(oldPath, newPath) {
        return osiApi.moveDir(this.__userApiToken__, oldPath, newPath)
    }
}

export default logic