import userApi from '../user-api/auth'
//import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'


describe('user-Api', () => {

    const name='Miguel'
    const password = '1234'
    let username

    beforeEach(() => username = `miguel-${Math.random()}@gmail.com`)

    describe("authenticate", () => {
 
        let _id

        beforeEach(()=>
        userApi.create(username,password,{name})
            .then(response => _id = response.data.id)
        )
     
        it('should succed on correct user credentials',() =>
        
            userApi.authenticate(username,password)
                .then(response => {

                    expect(response).toBeDefined()

                    const { status , data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    const {id , token } = data

                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                    expect(id).toBe(_id)

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const [,payloadB64,] = token.split('.')
                    const payloadJson = atob(payloadB64)
                    const payload = JSON.parse(payloadJson)

 
                    expect(payload.id).toBe(id)

                })
        
        
        )

        it('should fail on non-existing user', () =>

                userApi.authenticate(username = 'testwrong@gmail.com', password)
                .then(response =>{

                        expect(response).toBeDefined()

                        const{ status , error: _error} = response

                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" does not exist`)
                })
        )
    
    })

    
})



