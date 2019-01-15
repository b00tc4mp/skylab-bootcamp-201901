function indexOf(array, searchValue) {
    for (var i = 0; i < array.length; i++) 
        if (searchValue === array[i]) return i
    return -1 
}
