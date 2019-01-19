/**
 * Abstraction of splice
 * 
 * changes the contents of an array by removing or replacing existing elements and/or adding new elements.
 * 
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} countDel 
 * @param {*} item
 * 
 * @throws {}
 * 
 * @returns {Array} An array containing the deleted elements.
 */

function splice(arr, start, countDel, item) {


    if (!(arr instanceof Array)) throw TypeError(arr + ' should be an array')
    if (typeof arguments[1] !== "number") return [];

    else if (typeof arguments[1] === "number") {

        if (typeof arguments[2] === "number") {

            if (arguments.length === 3) {

                var ret = []
                for (var i = start; i < (start + countDel); i++) {
                    ret[i - start] = arr[i]
                }
                for (var i = (start + countDel); i < arr.length; i++) {
                    arr[i - countDel] = arr[i]
                }
                arr.length -= start
                return ret

            }

            else {

                var countA = 3;

                var ret = []

                for (var i = start; i < (start + countDel); i++) {
                    ret[i - start] = arr[i]
                }

                if (arguments.length - 3 < countDel) {

                    for (var i = (start); i < (start + countDel + (arguments.length - 3)); i++) {

                        if (arguments[countA]) {
                            arr[i] = arguments[countA]
                            countA++
                        }
                        else {
                            arr[i] = arr[i + countDel - countA + 3]
                        }
                    }
                    arr.length -= start

                }

                else if (arguments.length - 3 > countDel) {

                    // for (var i = start; i < (start + countDel); i++){

                    //     arr[i] = arguments[countA]
                    //     countA ++
                    // }
                    // var len = arr.length
                    // for (var k = (start + countDel); k < len; k ++){
                    //     arr[arr.length] = arr[k]
                    //     arr[k] = arguments[countA]
                    //     countA ++
                    // }

                    let leng = arr.length

                    for (var i = 0; i < (arguments.length - 3 - countDel); i++) {

                        let count = 0
                        for (var k = (start + countDel); k < (leng +1); k++) {

                            arr[arr.length - count] = arr[arr.length - count - 1]
                            count ++
                        }
                    }
                    for (var j = 0; j < (arguments.length -3); j++){

                        arr[start+j] = arguments[3+j]
                    }
                }
                return ret
            }
        }

        else if (typeof arguments[2] === "number") {

        }
        if (arguments.length < 3) {
            var ret = []
            for (var i = start; i < arr.length; i++) {
                ret[i - start] = arr[i]
            }
            arr.length -= start
            return ret
        }
    }







    // if (typeof start !== "number"){
    //     for (var i = 1; i< arguments.length; i++){
    //         arguments[i] = arguments[i+1]
    //     }
    // }


}