import call from '../common/call'


const events = {

    __url__: 'https://floating-refuge-24678.herokuapp.com/api/event',

        // __url__: 'https://evening-hamlet-54593.herokuapp.com/api/event',




    retrieveEvents(token, medicalField, eventType) {

        return (async () => {
            const result = await call(`${this.__url__}/search?field=${medicalField}&type=${eventType}`, {
                method: 'GET',
                headers: { 'x-auth-token': token }
            })
            return result.data
        })()
    },

    retrieveOneEvent(token, id) {
        return (async () => {
            const result = await call(`${this.__url__}/${id}`, {
                method: 'GET',
                headers: { 'x-auth-token': token }
            })
            return result.data
        })()
    },
    sendComment(id, token, text) {
        debugger
        return (async () => {
            return await call(`${this.__url__}/${id}`, {
                method: 'POST',
                headers: { 'x-auth-token': token },
                data: { text }
            })
        })()
    },
    publishEvent(token, title, description, medicalField, eventType, location,date, numberTicketsAvailable, price, image) {
        return (async () => {
            debugger
            return await call(`${this.__url__}`, {
                method: 'POST',
                headers: { 'x-auth-token': token },
                data: { title, description, medicalField, eventType, location,date, numberTicketsAvailable, price, image }
            })
        })()
    }
}

export default events