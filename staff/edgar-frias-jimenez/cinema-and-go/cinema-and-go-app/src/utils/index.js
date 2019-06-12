/**
 * Returns the default position from the one in the sessionStorage in Array format
 */
export function defaultPosition () {
    const defaultPos = sessionStorage.getItem('userLocation').split(',').map(item => parseFloat(item))

    return defaultPos
}

/**
 * Returns the userPosition from the sessionStorage in Object {lat, lng} format
 */
export function getUserPosition () {
    const defaultPos = defaultPosition()

    const userPosition = {
        lng: defaultPos[0],
        lat: defaultPos[1]
    }

    return userPosition
}

/**
 * Format the given date in unix to a more legible format in string with the hour
 *
 * @param {Number} dateTime Time in unix format
 *
 * @returns a string with the given hour
 */
export function normalizeTimer(dateTime) {
    const date = new Date(dateTime*1000)
    const hours = "0" + date.getHours()
    const minutes = "0" + date.getMinutes()
    const seconds = "0" + date.getSeconds()

    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    return formattedTime
}
