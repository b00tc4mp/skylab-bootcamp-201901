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
            let directory = await path.join(`${__dirname}/../data/${data}`, dirPath)

            /* Ascertains if the directory exists, which shouldn't, and creates it */
            if (!fs.existsSync(directory)) {

                await fs.mkdir(directory, err => {
                    if (err) throw err
                })

                /* Builds the path to the @.this.json file of the child directory */
                let pathToChildJson = path.join(directory, '.this.json')

                /* Writes the @.this.json in the child directory */
                await fs.writeFile(pathToChildJson, JSON.stringify({
                    open: false,
                    type: 'folder',
                    name: dirName,
                    children: []
                }, null, 4), err => {
                    if (err) throw err
                })

                /* Joins to the exact path to @.this.json */
                let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

                /* Reads the json file of the father directory, gets it as buffer */
                let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                    if (err) throw err
                })

                /* Parses the json buffer */
                let jsonFile = JSON.parse(jsonBuffer)

                /* Get positions which aren't available from @.this.json children */
                let nonAvailablePositions = jsonFile.children.map(child => {
                    return Number(child.position)
                })

                /* Searches for an available position */
                let desiredPosition = 0

                while (nonAvailablePositions.includes(desiredPosition)) {
                    ++desiredPosition
                }

                /* Folder data model */
                let newChild = {
                    name: dirName,
                    open: false,
                    type: 'folder',
                    position: desiredPosition
                }

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

        if (typeof filePath !== 'string') throw TypeError(`${filePath} should be a string`)

        if (!filePath.trim().length) throw Error('filePath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const dirPath = `${__dirname}/../data/${data}`

            const completeFilePath = await path.join(dirPath, filePath)

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

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Get positions which aren't available from @.this.json children */
            let nonAvailablePositions = jsonFile.children.map(child => {
                return Number(child.position)
            })

            /* Searches for an available position */
            let desiredPosition = 0

            while (nonAvailablePositions.includes(desiredPosition)) {
                ++desiredPosition
            }

            /* File data model */
            let newChild = {
                name: fileContent.name + fileContent.type,
                open: false,
                type: 'file',
                children: [],
                position: desiredPosition
            }

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

            /* Ascertains if a file already exists with this name, which shouldn't */
            if (!fs.existsSync(`${completeFilePath}`)) {

                /* Creates the new file based on the contents passed */
                fs.writeFile(`${completeFilePath}${fileContent.type}`, JSON.stringify(fileContent.content, null, 4), err => {
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

            /* Builds the path to the file to retrieve */
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
            let rsFiltered = rs.filter(elem => elem !== '.this.json')

            /* Returns the filtered contents */
            return rsFiltered
        })()
    },
    /**
     * 
     * Updates the position of a specific element.
     * 
     * @param {string} token 
     * @param {string} elementPath 
     * @param {string} position 
     * 
     * @throws {Error} - On empty data
     * @throws {TypeError} - On invalid data type
     */
    updatePosition(token, elementPath, position) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof elementPath !== 'string') throw TypeError(`${elementPath} should be a string`)

        if (!elementPath.trim().length) throw Error('elementPath cannot be empty')

        if (typeof position !== 'string') throw TypeError(`${position} should be a string`)

        if (!position.trim().length) throw Error('position cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const resPath = `${__dirname}/../data/${data}`

            let slices = elementPath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(resPath, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the index of the child to update */
            let childToRemoveIndex = jsonFile.children.findIndex(child => child.name === slices[slices.length - 1])

            /* Updates the child by it's index */
            jsonFile.children[childToRemoveIndex].position = Number(position)

            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            return 'Done'
        })()
    },
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

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the index of the child directory to remove */
            let childToRemoveIndex = jsonFile.children.findIndex(child => child.name === slices[slices.length - 1])

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
     * @param {string} token 
     * @param {string} filePath 
     */
    removeFile(token, filePath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof filePath !== 'string') throw TypeError(`${filePath} should be a string`)

        if (!filePath.trim().length) throw Error('filePath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the user's root folder */
            const resPath = `${__dirname}/../data/${data}`

            let slices = filePath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the index of the child file to remove */
            let childToRemoveIndex = jsonFile.children.findIndex(child => child.name === slices[slices.length - 1])

            /* Removes the child by it's index */
            jsonFile.children.splice(childToRemoveIndex, 1)

            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Joins to the exact path to the file to remove */
            const myPath = path.join(resPath, filePath)

            /* Ascertains if the user's root folder exists, which should */
            if (!fs.existsSync(resPath)) throw Error('Root folder for this user not found')

            /* Ascertains if the file exists, which should */
            if (!fs.existsSync(myPath)) throw Error('Folder to remove not found')

            /* Removes file by it's path */
            await fs.unlink(myPath, err => {
                if (err) throw err
            })

            /* Ascertains if the file has been successfully removed */
            if (fs.existsSync(myPath)) return 'Done'
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
    rename(token, oldPath, newPath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof oldPath !== 'string') throw TypeError(`${oldPath} should be a string`)

        if (!oldPath.trim().length) throw Error('oldPath cannot be empty')

        if (typeof newPath !== 'string') throw TypeError(`${newPath} should be a string`)

        if (!newPath.trim().length) throw Error('newPath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the element to rename */
            const oldCompletePath = `${__dirname}/../data/${data}/${oldPath}`

            /* Builds the path to the element renamed */
            const newCompletePath = `${__dirname}/../data/${data}/${newPath}`

            /* Ascertains if the old path exists, which should */
            if (!fs.existsSync(oldCompletePath)) throw Error('old path not found')

            /* Ascertains if the new path folder exists, which shouldn't */
            if (fs.existsSync(newCompletePath)) throw Error('new path already exists')

            let slices = oldPath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slices.length === 1) return ""
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the name of the child to rename in @.this.json and renames it */
            let jsonChildrenUpdated = jsonFile.children.map(child => {
                if (child.name === oldPath) {
                    child.name = newPath
                    return child
                } else {
                    return child
                }
            })

            /* Sets the updated children as @.this.json's children */
            jsonFile.children = jsonChildrenUpdated

            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Renames the file */
            await fs.promises.rename(oldCompletePath, newCompletePath, err => {
                if (err) throw err
            })

            /* Returns when 'Done' finished */
            return 'Done'
        })()
    },
    /**
     * 
     * Retrieves the first level of children of the 
     * 
     * @param {string} token 
     * @param {string} folder 
     */
    retrieveLevel(token) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the file to retrieve */
            const resPath = `${__dirname}/../data/${data}/.this.json`

            /* Ascertains if the file exists, which should */
            if (!fs.existsSync(resPath)) throw Error('File not found')

            /* Reads the file, gets it as buffer */
            const rs = await fs.promises.readFile(resPath, err => {
                if (err) throw err
            })

            /* Returns the parsed file contents */
            return JSON.parse(rs)
        })()
    },

    moveFile(token, oldFilePath, newFilePath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof oldFilePath !== 'string') throw TypeError(`${oldFilePath} should be a string`)

        if (!oldFilePath.trim().length) throw Error('oldFilePath cannot be empty')

        if (typeof newFilePath !== 'string') throw TypeError(`${newFilePath} should be a string`)

        if (!newFilePath.trim().length) throw Error('newFilePath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the file to move */
            let oldFileCompletePath = path.join(`${__dirname}/../data/${data}`, oldFilePath)

            /* Builds the path to the folder where the file will be moved */
            let newFileCompletePath = path.join(`${__dirname}/../data/${data}`, newFilePath)

            /* Ascertains if the file path exists, which should */
            if (!fs.existsSync(oldFileCompletePath)) throw Error('path to file not found')

            /* Ascertains if the new file path exists, which shouldn't */
            if (fs.existsSync(newFileCompletePath)) throw Error('path to new file already exists')

            let slices = oldFilePath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slices.length === 1) return ""
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Ascertains that the path to @.this.json is correct */
            pathToJson = slices.length === 1 ? "" : pathToJson

            /* Joins to the exact path to @.this.json */
            let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFile = JSON.parse(jsonBuffer)

            /* Finds the index of the child file to remove */
            let childToRemoveIndex = jsonFile.children.findIndex(child => child.name === slices[slices.length - 1])

            /* Removes the child by it's index */
            jsonFile.children.splice(childToRemoveIndex, 1)

            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Builds the path to the new @.this.json file */
            let pathToNewFolderJson = newFilePath.split('/').reverse()[1]

            /* Joins to the exact path to @.this.json */
            let jsonPathToNewFolder = path.join(`${__dirname}/../data/${data}`, pathToNewFolderJson, '.this.json')

            /* Reads the json file of the new father directory, gets it as buffer */
            let newJsonBuffer = await fs.promises.readFile(jsonPathToNewFolder, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let newJsonFile = JSON.parse(newJsonBuffer)

            /* Get positions which aren't available from @.this.json children */
            let nonAvailablePositions = newJsonFile.children.map(child => {
                return Number(child.position)
            })

            /* Searches for an available position */
            let desiredPosition = 0

            while (nonAvailablePositions.includes(desiredPosition)) {
                ++desiredPosition
            }

            /* File data model */
            let newChild = {
                name: newFilePath.split('/').reverse()[0],
                open: false,
                type: 'file',
                position: desiredPosition
            }

            /* Pushes the child folder's data into the father's @.this.json file " */
            await newJsonFile.children.push(newChild)


            /* Overwrites the father's current @.this.json file with the new one which has the updated children */
            await fs.promises.writeFile(jsonPathToNewFolder, JSON.stringify(newJsonFile, null, 4), err => {
                if (err) throw err
            })

            /* Moves file */
            await fs.rename(oldFileCompletePath, newFileCompletePath, err => {
                if (err) throw err
            })

            return 'Done'
        })()
    },

    moveDir(token, oldFolderPath, newFolderPath) {
        if (typeof token !== 'string') throw TypeError(`${token} should be a string`)

        if (!token.trim().length) throw Error('token cannot be empty')

        if (!!!jwt.verify(token, this.jwtSecret)) throw Error('token not correct')

        if (typeof oldFolderPath !== 'string') throw TypeError(`${oldFolderPath} should be a string`)

        if (!oldFolderPath.trim().length) throw Error('oldFolderPath cannot be empty')

        if (typeof newFolderPath !== 'string') throw TypeError(`${newFolderPath} should be a string`)

        if (!newFolderPath.trim().length) throw Error('newFolderPath cannot be empty')

        return (async () => {
            /* Extracts the user's id form it's token */
            const { data } = await jwt.verify(token, this.jwtSecret)

            /* Builds the path to the folder to move */
            const oldFolderCompletePath = path.join(`${__dirname}/../data/${data}`, oldFolderPath)

            /* Builds the path to the parent folder where the folder will be moved */
            const newFolderCompletePath = path.join(`${__dirname}/../data/${data}`, newFolderPath)

            /* Ascertains if the folder path exists, which should */
            if (!fs.existsSync(oldFolderCompletePath)) throw Error('path to file not found')

            /* Ascertains if the new folder path exists, which shouldn't */
            if (fs.existsSync(newFolderCompletePath)) throw Error('path to new file already exists')

            /* Extracts the name of the directory to create */
            let dirName = newFolderPath.split('/').reverse()[0]

            let oldSlices = oldFolderPath.split('/')

            let pathToFatherJson = oldSlices.reduce((accum, slice) => {
                if (slice === oldSlices[oldSlices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Ascertains that the path to @.this.json is correct */
            pathToFatherJson = oldSlices.length === 1 ? "" : pathToFatherJson

            /* Joins to the exact path to @.this.json */
            let jsonFatherPath = path.join(`${__dirname}/../data/${data}`, pathToFatherJson, '.this.json')

            /* Reads the json file of the father directory, gets it as buffer */
            let jsonFatherBuffer = await fs.promises.readFile(jsonFatherPath, err => {
                if (err) throw err
            })

            /* Parses the json buffer */
            let jsonFatherFile = JSON.parse(jsonFatherBuffer)

            /* Finds the index of the child file to remove */
            let childToRemoveIndex = jsonFatherFile.children.findIndex(child => child.name === oldSlices[oldSlices.length - 1])

            /* Removes the child by it's index */
            jsonFatherFile.children.splice(childToRemoveIndex, 1)

            await fs.promises.writeFile(jsonFatherPath, JSON.stringify(jsonFatherFile, null, 4), err => {
                if (err) throw err
            })

            let slices = newFolderPath.split('/')

            /* Obtains the path to the scope of the desired @.this.json  */
            let pathToJson = slices.reduce((accum, slice) => {
                if (slice === slices[slices.length - 1]) return accum
                return accum + '/' + slice
            })

            /* Builds the directory path based on the @newFolderPath given */
            let directory = await path.join(`${__dirname}/../data/${data}`, newFolderPath)

            /* Ascertains if the directory exists, which shouldn't, and creates it */
            if (!fs.existsSync(directory)) {

                await fs.mkdir(directory, err => {
                    if (err) throw err
                })

                /* Builds the path to the @.this.json file of the child directory */
                let pathToChildJson = path.join(directory, '.this.json')

                /* Writes the @.this.json in the child directory */
                await fs.writeFile(pathToChildJson, JSON.stringify({
                    open: false,
                    type: 'folder',
                    name: dirName,
                    children: []
                }, null, 4), err => {
                    if (err) throw err
                })

                /* Joins to the exact path to @.this.json */
                let jsonPath = path.join(`${__dirname}/../data/${data}`, pathToJson, '.this.json')

                /* Reads the json file of the father directory, gets it as buffer */
                let jsonBuffer = await fs.promises.readFile(jsonPath, err => {
                    if (err) throw err
                })

                /* Parses the json buffer */
                let jsonFile = JSON.parse(jsonBuffer)

                /* Get positions which aren't available from @.this.json children */
                let nonAvailablePositions = jsonFile.children.map(child => {
                    return Number(child.position)
                })

                /* Searches for an available position */
                let desiredPosition = 0

                while (nonAvailablePositions.includes(desiredPosition)) {
                    ++desiredPosition
                }

                /* Folder data model */
                let newChild = {
                    name: dirName,
                    open: false,
                    type: 'folder',
                    position: desiredPosition
                }

                /* Pushes the child folder's data into the father's @.this.json file " */
                await jsonFile.children.push(newChild)

                /* Overwrites the father's current @.this.json file with the new one which has the child folder data */
                await fs.promises.writeFile(jsonPath, JSON.stringify(jsonFile, null, 4), err => {
                    if (err) throw err
                })

                /* Searches for the children of the folder to move */
                let dirChildren = await fs.promises.readdir(oldFolderCompletePath, err => {
                    if (err) throw err
                })

                /* Filters the children to remove the @.this.json file */
                let filteredChildren = dirChildren.filter(child => child !== '.this.json')

                await filteredChildren.forEach(async child => {
                    let currentCompleteChildPath = oldFolderCompletePath + '/' + child
                    
                    let currentChildPath = oldFolderPath + '/' + child
                    
                    let newCompleteChildPath = newFolderCompletePath + '/' + child
                    
                    let newChildPath = newFolderPath + '/' + child
                    
                    let fileStatus

                    /* Gets the childs status */
                    try {
                        fileStatus = await fs.promises.lstat(currentCompleteChildPath)
                    } catch(err) {
                        if (err) throw err
                    }

                    // let fileStatus = fs.lstatSync(currentCompleteChildPath)

                    /* Checks if the child is a directory and if so reruns the recursive movement on it, else moves the file */
                    if (fileStatus.isDirectory()) {
                        await this.moveDir(token, currentChildPath, newChildPath)
                    } else {
                        let newSlices = newChildPath.split('/')

                        /* Obtains the path to the scope of the desired @.this.json  */
                        let newPathToJson = newSlices.reduce((accum, slice) => {
                            if (newSlices.length === 1) return ""
                            if (slice === newSlices[newSlices.length - 1]) return accum
                            return accum + '/' + slice
                        })

                        /* Ascertains that the path to @.this.json is correct */
                        newPathToJson = newSlices.length === 1 ? "" : newPathToJson

                        /* Joins to the exact path to @.this.json */
                        let newJsonPath = path.join(`${__dirname}/../data/${data}`, newPathToJson, '.this.json')

                        let oldJsonBuffer

                        /* Reads the json file of the father directory, gets it as buffer */
                        try {
                            oldJsonBuffer = await fs.promises.readFile(newJsonPath)
                        } catch(err) {
                            if (err) throw err
                        }
                        // let oldJsonBuffer = await fs.readFileSync(newJsonPath)

                        /* Parses the json buffer */
                        let newJsonFile = JSON.parse(oldJsonBuffer)

                        /* Get positions which aren't available from @.this.json children */
                        let nonAvailablePositions = newJsonFile.children.map(child => {
                            return Number(child.position)
                        })

                        /* Searches for an available position */
                        let desiredPosition = 0

                        while (nonAvailablePositions.includes(desiredPosition)) {
                            ++desiredPosition
                        }

                        /* File data model */
                        let newChild = {
                            name: newChildPath.split('/').reverse()[0],
                            open: false,
                            type: 'file',
                            position: desiredPosition
                        }

                        /* Pushes the child folder's data into the father's @.this.json file " */
                        newJsonFile.children.push(newChild)

                        try {
                            await fs.promises.writeFile(newJsonPath, JSON.stringify(newJsonFile, null, 4))
                        } catch(err) {
                            if (err) throw err
                        }
                        /* Overwrites the father's current @.this.json file with the new one which has the updated children */

                        // fs.writeFileSync(newJsonPath, JSON.stringify(newJsonFile, null, 4))

                        /* Ascertain if the file exists */
                        let fileStatus = fs.existsSync(currentCompleteChildPath)

                        if (fileStatus) {
                            /* Moves file */
                            await fs.rename(currentCompleteChildPath, newCompleteChildPath, err => {
                                if (err) throw err
                            })
                        }
                        await deleteFolder(oldFolderCompletePath)
                    }
                })

                /* Recursively deletes the desired folder by it's path */
                const deleteFolder = async (myPath) => {

                    /* Reads the folder to access it's children */
                    let content
                    try {
                        content = await fs.promises.readdir(myPath, (err, files) => {
                            if (err) throw err
                            return files
                        })
                    } catch(err) {
                        if (err) throw err
                    }

                    /* Maps through the folder's children and ascertains if they are folders or files */
                    content.map(async (file, index) => {
                        let currentPath = path.join(myPath, file);

                        if (fs.existsSync(currentPath)) {
                            /* Gets the childs status */
                            let fileStatus = fs.lstatSync(currentPath)
    
                            /* Checks if the child is a directory and if so reruns the recursive deletion on it, else removes the file */
                            if (fileStatus.isDirectory()) {
                                deleteFolder(currentPath);
                            } else {
                                return fs.unlinkSync(currentPath);
                            }
                        }
                    })

                    /* Reads the folder to access it's children */
                    let finalContent
                    try {
                        finalContent = await fs.promises.readdir(myPath, err => {
                            if (err) throw err
                        })
                    } catch(err) {
                        if (err) throw err
                    }

                    /* Ascertains that the folder has been emptied */
                    if (finalContent.length > 0) return deleteFolder(myPath)

                    /* Removes the folder */
                    await fs.promises.rmdir(myPath, err => {
                        if (err) throw err
                    })
                    return 'Done'
                }
                // return deleteFolder(oldFolderCompletePath)

            } else {
                throw Error(`Folder ${dirName} already exists in ${directory}`)
            }
        })()
    }
}

module.exports = logic