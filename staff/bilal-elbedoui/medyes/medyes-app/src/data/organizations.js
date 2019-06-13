const call = require('../common/call')



const organizations = {

    __url__: 'http://localhost:8080/api/organization',
    // __url__: 'https://evening-hamlet-54593.herokuapp.com/api/organization',



    addOrganization(token, name, phone, address, mail) {
        return (async()=>{
            return await call(`${this.__url__}`, {
                method: 'POST',
                headers: { 'x-auth-token': token },
                data: { name, phone, address, mail }
            })
        })()
    }
}


module.exports = organizations
