var a="test"
var b=[1,2,3,4]

function isArray(arguments){
    if(arguments instanceof Array){
        return true
    }
    else{return false}
}

isArray(b)