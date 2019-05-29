const sessionStorage = {
    clear() {
        const keys = Object.keys(sessionStorage)

        keys.forEach(key => delete sessionStorage[key])
    }
}

global.sessionStorage = sessionStorage