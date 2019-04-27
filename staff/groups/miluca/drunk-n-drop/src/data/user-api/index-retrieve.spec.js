describe('userapi retrieve',() =>{
    let _id,token
    beforeEach(() => {
        userApi.create(username,password,{name,favorites,creations})
            .then(({data}) => {
                _id=data.id
                return userApi.authenticate(username,password)
                    .then(({data}) => {
                        token=data.token
                    })
            })
    })
    describe('should succeed on correct id and token', ()=>{
        const wrongid='5cb9998f2e59ee0009eac02c-wrong-id'
        userApi.retrieve(wrongid,token)
            .then(({status, data}) => {
                expect(status).toBe('OK')
                expect(data).toBeDefined()
                expect(data.username).toBeDefined()
                expect(data.password).toBeUndefined()
            })
    })
    describe('should fail on incorrect token', ()=>{
        const wrongtoken='wrong-token'
        userApi.retrieve(_id,wrongtoken)
            .then(({status, error}) => {
                expect(status).toBe('KO')
                expect(error).toBe(`TODO`)
            })
    })
    describe('should fail on incorrect id', ()=>{
        userApi.retrieve(_id,token)
            .then(({status, error}) => {
                expect(status).toBe('KO')
                expect(error).toBe(`TODO`)
            })
    })


})