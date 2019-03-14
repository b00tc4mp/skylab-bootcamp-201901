var mocha = require('mocha')

function MyReporter (runner) { 

        const SILENT = false
        const SAVEJSON = true // options.reporterOptions.savejson

        mocha.reporters.Base.call(this, runner)

        var sum = 0 // Sum of tests as they run. This is probably unecessary but I want to output 3 boxes
        
        //values for the JSON output
        var json_tests = []
        var json_pending = []
        var json_failures = []
        var json_passes = []

        function write(str){
          if(!SILENT) process.stdout.write(str)
        }

        runner.on('test end', function(test) {
          json_tests.push(test)
        })

        runner.on('pass', function(test){
          sum++
          json_passes.push(test)
          // update()
        })

        runner.on('fail', function(test, err){
          sum++
          json_failures.push(test)
          // update()
        })

        runner.on('pending', function(test) {
          json_pending.push(test)
        })

        runner.on('end', function(){
          // update()
          
          if(SAVEJSON !== undefined){
            // Build JSON
            var obj = {
              tests: json_tests.map(clean),
              pending: json_pending.map(clean),
              failures: json_failures.map(clean),
              passes: json_passes.map(clean)
            }

            let json = JSON.stringify(obj, null, 2)
            
            if (MyReporter.callback)  return MyReporter.callback(obj)

          }
        })
}



/*
* these come straight from the mocha repo - used to tidy up JSON
*/
function clean(test) {
  var err = test.err || {}
  if (err instanceof Error) {
    err = errorJSON(err)
  }
  return {
    title: test.title,
    fullTitle: test.fullTitle(),
    duration: test.duration,
    currentRetry: test.currentRetry(),
    err: cleanCycles(err)
  }
}

function cleanCycles(obj) {
  var cache = []
  return JSON.parse(
    JSON.stringify(obj, function(key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Instead of going in a circle, we'll print [object Object]
          return '' + value
        }
        cache.push(value)
      }

      return value
    })
  )
}
function errorJSON(err) {
  var res = {}
  Object.getOwnPropertyNames(err).forEach(function(key) {
    res[key] = err[key]
  }, err)
  return res
}
/*
* end of stuff straight from the mocha repo - used to tidy up JSON
*/

module.exports = MyReporter