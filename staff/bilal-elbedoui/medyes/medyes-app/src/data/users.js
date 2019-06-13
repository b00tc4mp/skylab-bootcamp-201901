const call = require('../common/call')



const users = {

    __url__: 'https://floating-refuge-24678.herokuapp.com/api/user',

    // __url__: 'https://evening-hamlet-54593.herokuapp.com/api/user',
    


    createUser(fullname, email, role, organization, phone, position, password) {


        return (async () => {
            try {
                const response = await call(`${this.__url__}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: { fullname, email, role, organization, phone, position, password }
                })
                return response.data
            } catch (error) {
                return error
            }
        })()
    },
    authenticateUser(email, password) {
        return (async () => {

                const response = await call(`${this.__url__}/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: { email, password }
                })
                return response
            })()
    },
    retrieveUser(token) {
        return (async () => {
            const response = await call(`${this.__url__}/me`, {
                method: 'GET',
                headers: { 'x-auth-token': token }
            })
            
            return response.data
        })()
    }

}


export default users
