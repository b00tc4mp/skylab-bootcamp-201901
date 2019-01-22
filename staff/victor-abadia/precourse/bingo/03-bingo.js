var name
var numbers = [2, 4, 6, 7, 9]

function welcome() {
    return prompt('Hello, what is your name?')
}

function screen() {
    name = welcome()
    if (name === '') {
        return screen()
    }
    console.log('Welcome ' + name + " Tu cartón es: " + numbers.join('-'))
    card()
}

function card() {
    var line = checkLine()
    if (line === true) {
        return alert("LINEA!")
    }
    var next = confirm('¿nueva bola?')
    if (next === true) {
        nextTurn()
    } else {
        console.log("Game over!") //(next) ? nextTurn() :  console.log("Game over!")
    }
}

function generateRandom() {
    var number = Math.floor(Math.random() * 10)
    return number
}

function nextTurn() {
    var newRandom = generateRandom()
    console.log(newRandom)
    var included = numbers.includes(newRandom)
    if (included === true) {
        numbers = numbers.map(function (number) {
            if (number === newRandom) {
                number = "X"
            }
            return number
        })
        console.log(newRandom + " si se encuentra | tu cartón es: " + numbers.join('-'))

    } else {
        console.log(newRandom + " no se encuentra | tu cartón es: " + numbers.join('-'))
    }
    setTimeout(card, 500)

}

function checkLine() {
    if (numbers.join('-') === "X-X-X-X-X") {
        return true
    } else {
        return false
    }
}

screen()
