import call from '../common/call'



const organizations = {

    __url__: 'https://floating-refuge-24678.herokuapp.com/api/organization',
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


export default organizations
