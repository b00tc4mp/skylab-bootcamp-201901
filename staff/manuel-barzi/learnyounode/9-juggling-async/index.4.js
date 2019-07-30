// with promises

// $ node . http://google.es http://google.it http://google.fr

const http = require('http')

const { argv: [, , ...urls] } = process

// parallel calls

// const calls = urls.map(url =>
//     new Promise((resolve, reject) => {
//         http.get(url, res => {
//             res.setEncoding('utf8')

//             res.on('error', err => reject(err))

//             let content

//             res.on('data', data => {
//                 content = (content || '') + data
//             })

//             res.on('end', () => resolve(content))
//         })
//     }))

// Promise.all(calls)
//     .then(resps => resps.forEach(resp => console.log(resp)))

// series calls

let chain = Promise.resolve()

urls.forEach(url =>
    chain = chain
        .then(() =>
            new Promise((resolve, reject) => {
                http.get(url, res => {
                    res.setEncoding('utf8')

                    res.on('error', err => reject(err))

                    let content

                    res.on('data', data => {
                        content = (content || '') + data
                    })

                    res.on('end', () => resolve(content))
                })
            })
        )
        .then(resp => console.log(resp))
)
