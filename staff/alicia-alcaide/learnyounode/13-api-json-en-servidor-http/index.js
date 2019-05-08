const [,, port] = process.argv

const http = require('http')
let url = require('url')


function parsetime (time) {
    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    }
}
   
 
function unixTime (time) {
    return {unixtime: time.getTime()}
}


const parseQuery = function (url) {
    switch (url.pathname) {
      case '/api/parsetime':
        return parsetime(new Date(url.query.iso))
      case '/api/unixtime':
        return unixTime(new Date(url.query.iso))
      default: return 'please enter a valid endpoint url'
    }
}

let server = http.createServer(function (request, response) {
   if (request.method === 'GET') {
       response.writeHead(200, {'Content-Type': 'application/json'})
       url = url.parse(request.url, true)
       response.end(JSON.stringify(parseQuery(url)))
   } else
   {
       response.writeHead(405)
       response.end()
   }
})

server.listen(Number(port), () => {console.log(`Listening in port: ${port}`)})