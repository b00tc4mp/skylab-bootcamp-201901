var getContentChunksFromUrl = require('./getContentChunksFromUrl')

const { argv: [, , url] } = process

getContentChunksFromUrl(url, (error, chunk) => console.log(chunk))