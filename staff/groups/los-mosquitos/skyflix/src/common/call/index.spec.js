import call from '.'

describe('call', () => {
    it('should succed on correct URL', () => {
        let result = call('https://www.google.es')
        expect(result instanceof Promise).toBeTruthy()
    })
})