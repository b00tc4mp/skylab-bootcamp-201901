'use strict'

    describe ('user api', ()=>{
        describe('register', ()=> {
            it('shoul create an new user if the user does not exist', (done)=>{
                userApi.create(name, surname, username, password, function(response){
                    expect(response).tiBeDefined()
                    const {status, data:{ id }}=response
                    expect (response.status).toBe('OK')
                    expect(responde.id)

                    done()
                })
            })
            it('shoul fail if the user does not exist', (done)=>{
                userApi.create('name', 'surname', 'username', 'password', (user)=>{
                    expect (user.status).toBe('OK')
                    done()
                })
            })
        })

    })