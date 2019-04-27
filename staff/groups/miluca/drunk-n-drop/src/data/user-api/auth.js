import validate from '../../common/validate'
import call from '../../common/call'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    authenticate(username,password){

        validate.arguments([
            {name:'username',value: username, type: 'string', notEmpty : true},
            {name:'password',value: password, type: 'string', notEmpty : true}
        ])
        
            return call(`${this.__url__}/auth`,{
                method : 'POST',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify({username , password}),
                timeout: this.__timeout__
            })

            .then(response => response.json())

    }
}

export default userApi