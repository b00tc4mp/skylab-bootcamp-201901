
/**
 * determines whether the passed value is an Array.
 * @param value
 * @returns {boolean}
 * 
 */

 /**
 * Method determines whether the passed value is an Array.
 * 
 * @param {Value} The value to be checked.
 * 
 * @returns {boolean} true if the value is an Array; otherwise, false.
 */


let value = ['hola']

function isArray (value){
  if(value instanceof Array){
      return true
  } else {
      return false
  }
}
