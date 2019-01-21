var forEach = (function() {
    var count = 0;
    
    return function(array, callback) {
        if (count < array.length) {
            callback(array[count++]);
        
            forEach(array, callback);
        } else count = 0;
    }
})();