/**
 * Polyfill that matches properties (keys and values) between the current instance and a given object.
 * 
 * @example
 *  const a = { x: 1, y: 2:, z: 3 }
 *  const b = { y: 2, z: 3}
 *  a.matches(b) // true
 *  b.matches(a) // false
 * 
 * @param {Object} object The object to match.
 * 
 * @returns {boolean} True if properties match, otherwise false.
 */
Object.prototype.matches = function(object) {
    for (const key in object)
        if (this[key] !== object[key]) return false

    return true
}
