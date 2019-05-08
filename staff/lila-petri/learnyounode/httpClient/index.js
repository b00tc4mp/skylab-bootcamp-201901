const http=require('http')
const [ , , url]=process.argv

const callback= function(response){
    response.setEncoding('utf8')
    response.on("error", function (error) { throw error })  
    response.on("data", function (data) { console.log(data)})  

}
http.get(url, callback)