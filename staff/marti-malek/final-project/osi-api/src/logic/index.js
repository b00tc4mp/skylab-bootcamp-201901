'use strict'

require('dotenv').config()

const { models: { User } } = require('osi-data')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

const logic = {
    jwtSecret: null,
    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password
     * @param {string} passwordConfirm 
     * 
     * @throws {Error} - On empty params
     * @throws {TypeError} - On incorrect data type
     */
    registerUser(name, surname, email, password, passwordConfirm) {

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

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },
    /**
     * 
     * Authenticates the user by it's credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(`${email} should be a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} should be a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('Error in credentials')

            const userId = user.id

            const secret = this.jwtSecret

            const token = await jwt.sign({
                data: userId
            }, secret, { expiresIn: '168h' })

            return token
        })()
    },
    /**
     * 
     * Retrieves the user's data from it's token.
     * 
     * @param {string} token 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return (async () => {

            const verToken = await jwt.verify(token, this.jwtSecret)

            const user = await User.findById(verToken.data).select('-__v -password').lean()

            if (!user) return null

            user.id = user._id.toString()

            delete user._id

            return user
        })()
    },
    /**
     * 
     * Updates the user's data from it's token.
     * 
     * @param {string} token 
     * @param {Object} data 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    updateUser(token, data) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!data) throw Error('data must exist')

        if (data.constructor !== Object) throw TypeError(`${data} should be an object`)

        return (async () => {

            const verToken = await jwt.verify(token, this.jwtSecret)

            const user = await User.findByIdAndUpdate(verToken.data, data).select('-__v -password').lean()

            user.id = user._id.toString()

            return true
        })()
    },
    /**
     * 
     * Removes the user from DB by it's token.
     * 
     * @param {string} token 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    removeUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        return (async () => {
            const verToken = await jwt.verify(token, this.jwtSecret)

            await User.findByIdAndDelete(verToken.data)

            return true
        })()
    },
    /**
     * 
     * Creates the root directory for the user.
     * 
     * @param {string} token
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    createRootDir(token) {

        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const dirPath = `${__dirname}/../data/${data}`

            /* Ascertains if the directory exists, which shouldn't, and creates it */
            if (!fs.existsSync(dirPath)) {

                await fs.mkdir(dirPath, err => {
                    if (err) throw err
                })

                /* Writes a .this.json file and fills it with the starting data of a folder */
                await fs.writeFile(`${dirPath}/.this.json`, JSON.stringify({
                    open: false,
                    type: 'folder',
                    name: data,
                    children: []
                }, null, 4), err => {
                    if (err) throw err
                })

                return 'Done'
            } else {
                return 'Folder already exists'
            }
        })()
    },
    /**
     * 
     * Creates a dir in the desired path.
     * 
     * @param {string} token
     * @param {string} dirPath
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    createDir(token, dirPath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof dirPath !== 'string') throw TypeError(`${dirPath} should be a string`)

        if (!dirPath.trim().length) throw Error('dirPath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Extracts the name of the directory to create */
            let dirName = dirPath.split('/').reverse()[0]

            let slices = dirPath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Chooses the directory path based on the @dirPath given */
            let directory
            if (dirPath.slice(1) === dirName) {

                directory = await path.join(`${__dirname}/../data/${data}`, dirPath)
            } else {
                directory = await path.join(`${__dirname}/../data/${data}`, dirPath, dirName)
            }

            /* Ascertains if the directory exists, which shouldn't and creates it */
            if (!fs.existsSync(directory)) {

                await fs.mkdir(directory, err => {
                    if (err) throw err
                })

                /* Joins to the exact path to @.this.json */
                let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

                /* Reads the json file of the father directory, gets it as buffer */
                let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                    if (err) throw err
                })

                /* Folder data model */
                let newChild = {
                    name: dirName,
                    open: false,
                    type: 'folder',
                    children: [],
                    position: null
                }

                /* Parses the json buffer */
                let jsonFile = JSON.parse(jsonBuffer)

                /* Pushes the child folder's data into the father's @.this.json file " */
                await jsonFile.children.push(newChild)

                /* Overwrites the father's current @.this.json file with the new one which has the child folder data */
                await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                    if (err) throw err
                })

                /* Returns the newly created folder's path starting from the user's root folder */
                return dirPath
            } else {
                throw Error(`Folder ${dirName} already exists in ${directory}`)
            }
        })()

    },
    /**
     * 
     * Creates a file in the desired path.
     * 
     * @param {string} token
     * @param {object} fileContent
     * @param {strign} filePath
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    createFile(token, fileContent, filePath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!fileContent) throw Error(`fileContent must exist`)

        if (fileContent.constructor !== Object) throw TypeError(`${fileContent} should be an object`)

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const dirPath = `${__dirname}/../data/${data}`

            let slices = filePath.split('/')

            /* Sets the name of the file to create from a slice of the given filePath */
            fileContent.name = slices[slices.length - 1]

            /* Sets the date of the file to the actual date */
            fileContent.date = Date.now()

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* File data model */
            let newChild = {
                name: fileContent.name + fileContent.type,
                open: false,
                type: 'file',
                children: [],
                position: null
            }

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Pushes the child folder's data into the father's @.this.json file " */
            await jsonFile.children.push(newChild)

            /* Overwrites the father's current @.this.json file with the new one which has the child file data */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Ascertains if the directory exists, which shouldn't, and creates it */
            if (!fs.existsSync(dirPath)) {
                await fs.mkdir(dirPath, err => {
                    if (err) throw err
                })
            }

            /* Ascertains if a with the name of the file to create already exists, which shouldn't */
            if (!fs.existsSync(`${dirPath}/${fileContent.name}`)) {

                /* Creates the new file based on the contents passed */
                fs.writeFile(`${dirPath}/${fileContent.name}${fileContent.type}`, JSON.stringify(fileContent.content, null, 4), err => {
                    if (err) throw err
                })
            }

            return `${fileContent.name}${fileContent.type}`
        })()
    },
    /**
     * 
     * Retrieves the contents from the desired file.
     * 
     * @param {string} token 
     * @param {string} filePath 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    retrieveFile(token, filePath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof filePath !== 'string') throw TypeError(`${filePath} should be a string`)

        if (!filePath.trim().length) throw Error('filePath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const dirPath = `${__dirname}/../data/${data}/${filePath}`

            /* Ascertains if the file exists, which should */
            if (!fs.existsSync(dirPath)) throw Error('File not found')

            /* Reads the file, gets it as buffer */
            const rs = await fs.promises.readFile(dirPath, err => {
                if (err) throw err
            })

            /* Returns the parsed file contents */
            return JSON.parse(rs)
        })()
    },
    /**
     * 
     * Retrieves the names of the children of the desired directory.
     * 
     * @param {string} token 
     * @param {string} dirPath 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    retrieveDir(token, dirPath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof dirPath !== 'string') throw TypeError(`${dirPath} should be a string`)

        if (!dirPath.trim().length) throw Error('dirPath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the desired folder */
            const resPath = `${__dirname}/../data/${data}/${dirPath}`

            /* Ascertains if the folder exists, which should */
            if (!fs.existsSync(resPath)) throw Error('File not found')

            /* Reads the file, gets it as buffer */
            const rs = await fs.readdirSync(resPath)

            /* Filters the contents found removing the @.this.json file */
            let rsFiltered = rs.filter(elem => elem !== '.position.json')

            /* Returns the filtered contents */
            return rsFiltered
        })()
    },
    // 
    // NOT SURE IF THIS FUNCTION IS NECESSARY
    // 
    // updatePosition(token, positions) {
    //     if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

    //     if (!token.trim().length) throw Error('token cannot be empty')

    //     if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

    //     if (!positions) throw Error('positions must be defined')

    //     if (positions.constructor !== Array) throw TypeError(`${positions} is not an array`)

    //     return (async () => {
    //         const { data } = await jwt.verify(token, this.jwtSecret)

    //         const resPath = `${__dirname}/../data/${data}`

    //         if (!fs.existsSync(resPath)) throw Error('directory not found')

    //         if (!fs.existsSync(`${resPath}/.position.json`)) throw Error('.position.json file not found')

    //         await fs.unlink(`${resPath}/.position.json`, err => {
    //             if (err) throw err
    //         })

    //         let isFileRemoved = await fs.existsSync(`${resPath}/.position.json`)

    //         if (!isFileRemoved) throw Error('cannot remove file')

    //         await fs.writeFile(`${resPath}/.position.json`, JSON.stringify(positions), err => {
    //             if (err) throw err
    //         })

    //         return positions
    //     })()
    // },
    /**
     * 
     * Recursively removes the desired directory by it's given path.
     * 
     * @param {string} token 
     * @param {string} dirPath 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    removeDir(token, dirPath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof dirPath !== 'string') throw TypeError(`${dirPath} should be a string`)

        if (!dirPath.trim().length) throw Error('dirPath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const resPath = `${__dirname}/../data/${data}`

            let slices = dirPath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the index of the child directory to remove */
            let childToRemoveIndex = jsonFile.children.findIndex(child => child.name === slices[slices.length-1])

            /* Removes the child by it's index */
            jsonFile.children.splice(childToRemoveIndex, 1)

            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Joins to the exact path to the folder to remove */
            const myPath = path.join(resPath, dirPath)

            /* Ascertains if the user's root folder exists, which should */
            if (!fs.existsSync(resPath)) throw Error('Root folder for this user not found')

            /* Ascertains if the folder exists, which should */
            if (!fs.existsSync(myPath)) throw Error('Folder to remove not found')

            /* Recursively deletes the deired folder by it's path */
            const deleteFolder = async (myPath) => {

                /* Reads the folder to access it's children */
                let content = await fs.promises.readdir(myPath, err => {
                    if (err) throw err
                })

                /* Maps through the folder's children and ascertains if they are folders or files */
                content.map(async (file, index) => {
                    let currentPath = path.join(myPath, file);

                    /* Gets the childs status */
                    let fileStatus = fs.lstatSync(currentPath)

                    /* Checks if the child is a directory and if so reruns the recursive deletion on it, else removes the file */
                    if (fileStatus.isDirectory()) {
                        deleteFolder(currentPath);
                    } else {
                        return fs.unlinkSync(currentPath);
                    }
                })

                /* Removes the folder */
                await fs.promises.rmdir(myPath, err => {
                    if (err) throw err
                })
                return 'Done'
            }
            return deleteFolder(myPath)
        })()
    },
    /**
     * 
     * Renames the desired element from it's @oldName to it's @newName
     * 
     * @param {string} token 
     * @param {string} oldName 
     * @param {string} newName 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    rename(token, oldName, newName) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof oldName !== 'string') throw TypeError(`${oldName} should be a string`)

        if (!oldName.trim().length) throw Error('oldName cannot be empty')

        if (typeof newName !== 'string') throw TypeError(`${newName} should be a string`)

        if (!newName.trim().length) throw Error('newName cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the element to rename */
            const oldPath = `${__dirname}/../data/${data}/${oldName}`

            /* Builds the path to the element renamed */
            const newPath = `${__dirname}/../data/${data}/${newName}`

            /* Ascertains if the old path exists, which should */
            if (!fs.existsSync(oldPath)) throw Error('old path not found')

            /* Ascertains if the new path folder exists, which shouldn't */
            if (fs.existsSync(newPath)) throw Error('new path already exists')

            /* Renames the file */
            await fs.promises.rename(oldPath, newPath, err => {
                if (err) throw err
            })

            /* Returns when 'Done' finished */
            return 'Done'
        })()
    },
    /**
     * 
     * 
     * 
     * @param {string} token 
     * @param {string} folder 
     */
    retrieveLevel(token, folder) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof folder !== 'string') throw TypeError(`${folder} should be a string`)

        if (!folder.trim().length) throw Error('folder cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const dirPath = `${__dirname}/../data/${data}/${filePath}`

            /* Ascertains if the file exists, which should */
            if (!fs.existsSync(dirPath)) throw Error('File not found')

            /* Reads the file, gets it as buffer */
            const rs = await fs.promises.readFile(dirPath, err => {
                if (err) throw err
            })

            /* Returns the parsed file contents */
            return JSON.parse(rs)
        })()
    }
}

module.exports = logic