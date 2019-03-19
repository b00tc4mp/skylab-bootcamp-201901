export default function(string, ...values) {
    for (let value of values)
        if (string.includes(value))
            return true
    
    return false
}