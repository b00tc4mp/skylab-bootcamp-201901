const { argv: [, , url] } = process

getContentChunksFromUrl(url, (error, chunk) => {
    if (error) throw error

    console.log(chunk)
})