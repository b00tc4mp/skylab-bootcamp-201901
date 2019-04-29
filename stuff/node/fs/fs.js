'use strict'

const fs = require('fs')
const path = require('path')

/*
WORKAROUND :D

const execSync = require('child_process').execSync

function cp(from, to) {
    execSync(`cp -R ${from} ${to}`)
}
*/

function cp(from, to) {
    const fromExists = fs.existsSync(from)

    if (!fromExists) throw Error('origin file or folder does not exist')

    const fromIsFile = fs.lstatSync(from).isFile()

    const toExists = fs.existsSync(to)

    let toIsFile = true

    if (toExists) {
        toIsFile = fs.lstatSync(to).isFile()
    } else if (!fromIsFile) {
        fs.mkdirSync(to)

        toIsFile = false
    }

    const _fromName = itemName(from)

    if (fromIsFile) {
        const rs = fs.createReadStream(from)
        const ws = fs.createWriteStream(toIsFile ? to : path.join(to, _fromName))

        rs.pipe(ws)
    } else {
        if (toIsFile) throw Error('destiny is not a folder')

        const fromFiles = listFiles(from)

        const toFolder = to

        fromFiles.forEach(fromFile => cp(fromFile, toFolder))

        const fromFolders = listFolders(from)

        fromFolders.forEach(fromFolder => {
            const toSubFolder = path.join(toFolder, itemName(fromFolder))

            cp(fromFolder, toSubFolder)
        })
    }
}

function itemName(from) {
    return from.match(/([^\/]*)\/*$/)[1]
}

function listFiles(from) {
    return fs.readdirSync(from).map(item => path.join(from, item)).filter(item => fs.lstatSync(item).isFile())
}

function listFolders(from) {
    return fs.readdirSync(from).map(item => path.join(from, item)).filter(item => fs.lstatSync(item).isDirectory())
}

function mv(from, to) {
    debugger

    const fromExists = fs.existsSync(from)

    if (!fromExists) throw Error('origin file or folder does not exist')

    const fromIsFile = fs.lstatSync(from).isFile()

    const toExists = fs.existsSync(to)

    let toIsFile = true

    let _fromName = itemName(from)

    if (toExists) {
        debugger

        toIsFile = fs.lstatSync(to).isFile()

        if (toIsFile) {
            if (!fromIsFile) throw Error(`cannot move folder ${from} to file ${to}`)
        } else {
            if (!fromIsFile) fs.mkdirSync(path.join(to, _fromName))
        }
    } else  {
        debugger

        if (!fromIsFile) {
            fs.mkdirSync(to)

            _fromName = ''
        }

        toIsFile = false
    }

    if (fromIsFile) {
        debugger

        // const rs = fs.createReadStream(from)
        // const ws = fs.createWriteStream(toIsFile ? to : path.join(to, _fromName))

        // rs.pipe(ws)

        const content = fs.readFileSync(from)
        fs.writeFileSync(toIsFile ? to : path.join(to, _fromName), content)

        rm(from)
    } else {
        debugger

        if (toIsFile) throw Error('destiny is not a folder')

        const fromFiles = listFiles(from)

        const toFolder = path.join(to, _fromName)

        // if (!fs.existsSync(toFolder)) fs.mkdirSync(toFolder)

        fromFiles.forEach(fromFile => {
            mv(fromFile, toFolder)
        })

        const fromFolders = listFolders(from)

        fromFolders.forEach(fromFolder => {
            const toSubFolder = toFolder //path.join(toFolder, itemName(fromFolder))

            debugger

            mv(fromFolder, toSubFolder)
        })

        rm(from)
    }
}

function rm(from) {
    const isFile = fs.lstatSync(from).isFile()

    if (isFile) fs.unlinkSync(from)
    else fs.rmdirSync(from)
}

module.exports = {
    mv,
    cp,
    rm
}
