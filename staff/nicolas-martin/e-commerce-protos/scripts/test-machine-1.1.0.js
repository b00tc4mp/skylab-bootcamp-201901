/**
 * Prints the suite title in the console.
 * 
 * Convenient method to be called before the test cases.
 * 
 * @param {string} title - Test suite title.
 */
function suite(title) {
    console.log('%c TEST ' + title, 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
}

/**
 * Runs a test expression and prints the result in the console.
 * 
 * @param {string} description - Description of the test case.
 * @param {Function} expression - Test expression to evaluate.
 */
function test(description, expression) {
    try {
        expression();

        console.log('%c CASE ' + description, 'color: green;');
    } catch (err) {
        console.error('CASE ' + description);

        console.error(err);
    }
}

/**
 * Asserts a condition.
 * 
 * @param {boolean} condition - The condition to be checked.
 * @param {string} description - Description of the condition to be accomplished.
 * 
 * @throws {Error} - If condition is not satisfied.
 */
function assert(condition, description) {
    if (!condition) throw Error(description);
}



/**
 * 
 * @param {Cart} - Object to create the products in 
 */

function createSetOfProducts() {

    var cart = new Cart();

    var tshirt = new TShirt(120, "Supreme", "white", "M");
    cart.add(tshirt);

    var sweater = new Sweater(120, "Diesel", "black", "M");
    cart.add(sweater);

    var laptop = new Laptop(120, "Apple", "MacBook Pro", 15);
    cart.add(laptop);

    var desktop = new Desktop(120, "HP", "1800", 20);
    cart.add(desktop);

    var mobile = new Mobile(120, "Apple", "iPhone X", "space-gray");
    cart.add(mobile);

    var mobile2 = new Mobile(120, "Xiaomi", "5X", "space-rose");
    cart.add(mobile2);

    return cart;
}