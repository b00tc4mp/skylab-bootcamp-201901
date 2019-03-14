function push(arr, element) {
    if (!(arr instanceof Array)) throw Error('array is not valid')
    if (element === undefined) throw Error('element not defined')

    return arr[arr.length] = element;
}
