const call = require('../common/call')



const organizations = {

    __url__: 'http://localhost:8080/api/organization',


    addOrganization(token, name, phone, address, mail) {
        (async()=>{
            return await call(`${this.__url__}`, {
                method: 'POST',
                headers: { 'x-auth-token': token },
                data: { name, phone, address, mail }
            })
        })()
    }
}


module.exports = organizations
