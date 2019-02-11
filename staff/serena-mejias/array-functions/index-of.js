//var string = 'pablo emilio';
var value = 'emilio';
var string=['p','a','b','l','o','' ,'e','m','i','l','i','o'];

function indexof(string, value){
    if (arguments.length > 2) throw Error('too many arguments');
    
    if (!(string instanceof String)) throw Error('string is not an String');

    if (!(value instanceof String)) throw Error('value is not an String');


    for(var i = 0; i<string.length; i++){
        if (string[i] === value[0]){
            console.log(typeof string);
            
            var comp=string.substring(i,i+value.length);
            if (comp === value){
                return i;
            }    
        }
    }
}
console.log(indexof(string,value));
