/*In this lesson we need to write a program that collects all data from an HTTP GET request and logs the 
number of characters and the complete string of characters received from the server.  But didn’t we just do 
that in the last exercise?  Not exactly.  The http module emits an events events as the request is processed.  
In the previous exercise we used the .on() method to listen for the first data event we received.  All other 
events are ignored. */


// // const cs = require('concat-stream')



// http.get(url, res => {
    //     // res.pipe(cs(content => console.log(`${content.length}\n${content}`)))
    
    //     totalhttp += chunk
    
    //     res.on('error', error => { throw error })
    // })
    
const http = require('http')
const { argv: [, , url] } = process
    
http.get(url, res => {
    var totalhttp = ''
    res.on('data', chunk => totalhttp += chunk)
    res.on('error', error => { throw error })
    res.on('end', ()=>{
        console.log(totalhttp.length)
        console.log(totalhttp)
    })
})


//node index.js http://google.es