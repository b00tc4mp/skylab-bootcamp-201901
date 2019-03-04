import osiApi from '.'
import { expect } from 'chai'


describe('osi api', () => {
    describe('register', () => {
        let name = 'm'
        let surname = 'm'
        let email
        let password

        it('should succeed with correct params', () => {
            osiApi.register(name, surname, email, password, password)
                .then(id => {
                    expect(id).to.exist
                })
        })
    })
})

