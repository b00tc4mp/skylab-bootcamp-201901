// $ node . http://google.es http://google.it http://google.fr

const http = require('http')

const { argv: [, , ...urls] } = process

// #0

// http.get(urls[0], res => {
//     res.setEncoding('utf8')

//     res.on('error', err => { throw err })

//     let content

//     res.on('data', data => {
//         content = (content || '') + data
//     })

//     res.on('end', () => {
//         console.log(content)

//         http.get(urls[1], res => {
//             res.setEncoding('utf8')

//             res.on('error', err => { throw err })

//             let content

//             res.on('data', data => {
//                 content = (content || '') + data
//             })

//             res.on('end', () => {
//                 console.log(content)

//                 http.get(urls[2], res => {
//                     res.setEncoding('utf8')

//                     res.on('error', err => { throw err })

//                     let content

//                     res.on('data', data => {
//                         content = (content || '') + data
//                     })

//                     res.on('end', () => {
//                         console.log(content)


//                     })
//                 })
//             })
//         })
//     })
// })

// #1

// let count = 0

// function httpGet(url) {
//     http.get(url, res => {
//         res.setEncoding('utf8')

//         res.on('error', err => { throw err })

//         let content

//         res.on('data', data => {
//             content = (content || '') + data
//         })

//         res.on('end', () => {
//             console.log(content);

//             (count < urls.length - 1) && httpGet(urls[++count])
//         })
//     })
// }

// httpGet(urls[count])

// #2

function httpGet(urls) {
    urls.length && http.get(urls[0], res => {
        res.setEncoding('utf8')

        res.on('error', err => { throw err })

        let content

        res.on('data', data => {
            content = (content || '') + data
        })

        res.on('end', () => {
            console.log(content);

            httpGet(urls.slice(1))
        })
    })
}

httpGet(urls)