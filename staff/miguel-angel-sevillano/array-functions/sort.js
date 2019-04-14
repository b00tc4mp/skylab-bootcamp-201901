

var a = [3, 4, 2, 5, 6, 7]


function sort(array) {

    if(!(array instanceof Array)) throw TypeError('is not an array');

    var newar = [];
    var n = 0;
    var acc = array.length
    var e = array.length - 1;
    var token = 0;
    var count = 0;
    
    for (let a = 0; a < array.length; a++) {

        for (var i = 0; i < acc; i++) {
            token = 0

            if (array[i] > array[i + 1] && i < e) {
                newar[n] = array[i + 1]
                n++
                newar[n] = array[i]
                n++
                token = 1
                count++
            }

            if (count >0){
                i++;
                count = 0;
            }



            else if (token === 0 && n == i) {

                newar[n] = array[i]
                n++;
            }

        }
        acc--;
        n = 0;
        for (var b = 0; b < newar.length; b++) {
            array[b] = newar[b]

        }

    }

    return newar
}




console.log(sort(a))