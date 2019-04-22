'use strict';

var text = '';
text += '┌┬┐┌─┐┬    ┌┬┐┬  ┌┬┐┌─┐┌─┐┌┬┐┌─┐┬\n';
text += '│││├─┤│     │││   │ ├┤ └─┐ │ ├─┤│\n';
text += '┴ ┴┴ ┴┴─┘  ─┴┘┴   ┴ └─┘└─┘ ┴ ┴ ┴o\n';

console.log(text);

var icon = '';
icon += '               ________________________\n';
icon += '              (_(((____________________)\n';
icon += '                /  |\n';
icon += '             @@/   |\n';
icon += '           @@@/____|@@\n';
icon += '         @@@ ,     \@@@\n';
icon += '      @@@@@  (*)  (*)@@\n';
icon += '    @@@@@@  ,    \  \@\n';
icon += '   @@@@@@       __)  )\n';
icon += ' @@@@@@    ,________(    _  |  |\n';
icon += ' @@@@@     /|_|_|_|_|   | \' |__|\n';
icon += ' @@@@@    |        A |_|| _ |  |\n';
icon += '  @@@@@   |  _ __ __    |_| |  |\n';
icon += '   @@@@@   \\|_|__|__|       |  |\n';
icon += '   @@@@@             \\\n';
icon += '     @@@       _______)\n';
icon += '        )         (\n';

console.log(icon);

/**
 * Runs a test describe.
 * 
 * @param {string} description The describe description.
 * @param {function} callback The describe expression to evaluate.
 */
function describe(description, callback) {
    console.log('TEST', description);

    callback();
}

/**
 * Runs a unit test case.
 * 
 * @param {string} description The test case description.
 * @param {function} callback The test case expression to evaluate.
 */
function it(description, callback) {
    try {
        callback();

        console.log('%c CASE ' + description, 'color: green');
    } catch (error) {
        console.error('CASE ' + description + '\n', error);
    }
}

/**
 * Checks wether a condition is satisfied, otherwise throws an error.
 * 
 * @param {*} actual The actual value to check agains the expected value.
 * @param {*} expected The expected value.
 */
function expect(actual, expected) {
    if (actual !== expected) throw Error('expected ' + actual + ' to be ' + expected);
}