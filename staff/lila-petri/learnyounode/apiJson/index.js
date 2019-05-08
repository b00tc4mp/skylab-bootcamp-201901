let url= require('url')
const http = require('http') 


const { argv: [, , port] } = process

function parseTime(time){
  return {
      hour: time.getHours(),  
      minute: time.getMinutes(),
      second: time.getSeconds()  
  }
}
function unixTime (time){
  return {unixtime: time.getTime()}
}

const paseQuery = function (url){
  switch (url.pathname){
    case '/api/parsetime':
      return parseTime(new Date(url.query.iso))
    case '/api/unixtime': 
      return unixTime(new Date(url.query.iso))
    default: return 'Incorrect url'
  }
}
let server = http.createServer(function(request, response) {
  if(request.method==='GET'){
    response.writeHead(200, {'Content-Type': 'application/json'})
    url = url.parse(request.url, true)
    response.end(JSON.stringify(paseQuery(url)))
  } else {
    response.writeHead(405)
    response.end()
  }
})
server.listen(Number(port), ()=>{
  console.log(`Listening on port ${port}`)
})