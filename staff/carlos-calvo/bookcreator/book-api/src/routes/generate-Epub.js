const logic = require('../logic')
const fs = require('fs');

module.exports = (req, res) => {
    const {params: { id } } = req
    try {
        logic.generateEpub(id)
            .then(route => {
                const filePath =  route
                fs.exists(filePath, (exists) => {
                    if (exists) {    
                        res.writeHead(200, {
                            'Content-Type': 'application/epub+zip',
                            'Access-Control-Expose-Headers': 'Content-Disposition'
                        })
                        fs.createReadStream(filePath).pipe(res)
                    } else {
                        res.writeHead(400, {"Content-Type": "text/plain"})
                        res.end("ERROR File does not exist")
                    }
                })
            })
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}












