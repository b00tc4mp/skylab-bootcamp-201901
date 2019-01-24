// arrow functions vs binding

// es5

var person = {
    age: 28,

    gender: 'f',

    hobbies: ['fishing', 'fitness', 'rubic', 'geeking'],
    numbers: [1, 2, 3, 4, 5],


    printInfo: function () {
        console.log('age:', this.age)

        console.log('gender', this.gender)

        console.log('hobbies:')
        this.hobbies.forEach(function (hobby) {
            console.log(hobby, this.age)

            this.numbers.forEach(function (number) { console.log(number, this.age) }.bind(this))
        }.bind(this))
    }
}

person.printInfo()

// es6

var person = {
    age: 28,

    gender: 'f',

    hobbies: ['fishing', 'fitness', 'rubic', 'geeking'],
    numbers: [1, 2, 3, 4, 5],


    printInfo: function () {
        console.log('age:', this.age)

        console.log('gender', this.gender)

        console.log('hobbies:')
        this.hobbies.forEach(hobby => {
            console.log(hobby, this.age)

            this.numbers.forEach(number => console.log(number, this.age))
        })
    }
}

person.printInfo()

// default parameters

function iterate(array, callback, from = 0, to = array.length) {
    for (var i = from; i < to; i++) callback(array[i])
}

iterate([1, 2, 3], console.log)
iterate([1, 2, 3], console.log, 1)
iterate([1, 2, 3], console.log, 0, 2)

// rest parameter

function printData(name, surname, ...extra) {
    console.log(name, surname, extra.length ? 'EXTRA { ' + extra.join(', ') + ' }' : '')
}

printData('john', 'doe')

printData('john', 'doe', 28, 'male', 'american')

// spread operator

// 1

var a = [1, 2, 3]

var b = [...a, 4] // [1, 2, 3, 4]

var b = [4, ...a] // [4, 1, 2, 3]

// 2

function printData(name, surname, ...extra) {
    debugger

    console.log(name, surname, extra.length ? 'EXTRA { ' + extra.join(', ') + ' }' : '')
}

var extra = [29, 'male', 'canadian']

printData('john', 'doe', ...extra)

// destructuring

var o = {
    p: {
        q: [{
            t: 2
        },
        {
            r: [{ u: 3 }, { v: 4 }, {
                s: 1
            }]
        }
        ]
    }
}

var { p: { q: [, { r: [, , { s }] }] } } = o

// 2

// es5

function printPerson(person) { console.log(person.name, person.surname) }

var person = { name: 'John', surname: 'Doe' }

printPerson(person)

// es6

function printPerson({name, surname}) { console.log(name, surname) }

var person = { name: 'John', surname: 'Doe' }

printPerson(person)

// classes

// es5

function Panel() {
}

Panel.prototype.show = function() { console.log('show me') }

function LoginPanel() {
}

LoginPanel.prototype = Object.create(Panel.prototype)
LoginPanel.prototype.constructor = LoginPanel

var loginPanel = new LoginPanel

loginPanel.show()

// es6

class Panel {
	show() { console.log('show me') }
}

function LoginPanel extends Panel {
}

var loginPanel = new LoginPanel

loginPanel.show()