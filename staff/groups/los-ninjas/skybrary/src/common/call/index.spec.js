import call from '.'

describe('call', () => {
const {alias = 'skybrary'} = data
const username= `skybrary${Math.random()}@skybrary.com`
const password = '123'

    it('should succeed on making a POST(create) call to the USERAPI', () => 
        call('https://skylabcoders.herokuapp.com/api/user', {method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, alias }),
        timeout:0})
    )
})