var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at 1st index position
//console.log(months);
var expected = ['Jan', 'Feb', 'March', 'April', 'June']