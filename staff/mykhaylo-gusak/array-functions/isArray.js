/**
 * Method determines whether the passed value is an Array.
 * 
 * @param {Value} The value to be checked.
 * 
 * @returns {boolean} true if the value is an Array; otherwise, false.
 */

function isArray(value) {
  
    if (value instanceof Array) {
        return true
    } else {
        return false
    }
   
}


// No tiene sentido comprobar antes si el valor a comprobar es un array o no ya que la misma funcion sirve para esto.