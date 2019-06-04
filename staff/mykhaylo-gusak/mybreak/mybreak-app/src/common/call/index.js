global.fetch = require('node-fetch')

function call(url, options = {}) {
    const { method = 'GET', headers, body, timeout = 0 } = options

    // todo validation

    let signal

    if (timeout) {
        const controller = new AbortController
        signal = controller.signal

        setTimeout(() => controller.abort(), timeout)
    }

    return fetch(url, {
        method,
        headers,
        body,
        signal
    })
        .catch(error => {
            debugger
            if (error instanceof Error) throw new Error('Cannot connect with server.')
            else if (error instanceof DOMException) throw new Error(`time out, exceeded limit of ${timeout}ms`)
            else throw error
        })

}

module.exports = call