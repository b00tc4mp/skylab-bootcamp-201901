const http = require('http')

const { argv: [, , ...urls] } = process

// 1
// const contents = new Array(urls.length).fill(undefined)

// 2
// const contents = new Array(urls.length)

// 3
const contents = []
let count = 0

urls.forEach((url, index) => {
    http.get(url, res => {
        let content = ''

        res.on('data', chunk => content += chunk)

        res.on('end', () => {
            contents[index] = content

            // 1
            // if (contents.every(content => content !== undefined)) {
            //     contents.forEach(content => console.log(content))
            // }

            // 2
            // let someUndefined = false

            // for (let i = 0; i < contents.length; i++) {
            //     if (contents[i] === undefined) {
            //         someUndefined = true

            //         break
            //     }
            // }

            // if (!someUndefined) {
            //     contents.forEach(content => console.log(content))
            // }

            // 3
            count++

            if (count === urls.length) contents.forEach(content => console.log(content))
        })
    })
})