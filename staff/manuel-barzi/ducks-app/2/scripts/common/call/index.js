
function call(url, callback, options = {}) {
    const { method = 'GET', headers, body, timeout = 0 } = options

    validate.arguments([
        { name: 'url', value: url, type: 'string', notEmpty: true },
        { name: 'method', value: method, type: 'string', notEmpty: true },
        { name: 'headers', value: headers, type: 'object', optional: true },
        { name: 'body', value: body, type: 'string', notEmpty: true, optional: true },
        { name: 'callback', value: callback, type: 'function' },
        { name: 'timeout', value: timeout, type: 'number', notEmpty: true, optional: true },
    ])

    validate.url(url)

    const xhr = new XMLHttpRequest

    xhr.timeout = timeout

    xhr.open(method, url)

    xhr.onload = function () {
        callback(undefined, this.responseText)
    }

    xhr.onerror = function () {
        callback(new ConnectionError('cannot connect'))
    }

    xhr.ontimeout = () => {
        callback(new TimeoutError(`time out, exceeded limit of ${timeout}ms`))
    }

    if (headers)
        for (let key in headers)
            xhr.setRequestHeader(key, headers[key])

    if (method === 'GET') {
        if (body) throw Error('cannot send body in GET request')
        else xhr.send()
    } else {
        if (body) {
            xhr.send(body)
        } else xhr.send()
    }
}