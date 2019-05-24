const calc = {
    add() {
        return Array.prototype.reduce
            .call(arguments, (accum, value) => accum + value, 0)
    }
}

//module.exports = calc
export default calc