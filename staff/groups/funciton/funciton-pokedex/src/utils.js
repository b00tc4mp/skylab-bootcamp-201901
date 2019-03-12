function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}
export function getPokemonId(url){
    let found = false;
    let id = ''
    for (let i = url.length-2; !found && i > 0; i--){
        if(url.charAt(i) !== '/'){
            id = id.concat(url.charAt(i))
        } else found = true
    }
    return reverseString(id)
}


