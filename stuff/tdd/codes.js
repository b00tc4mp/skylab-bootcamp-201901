describe('it fails if you pass something that is not a string', () => {
    it('should fail when username is undefined', () => {
        const username = undefined
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })
    it('should fail when username is number', () => {
        const username = 123
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })

    it('should fail when username is boolean', () => {
        const username = true
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })
    
    

    it('should fail when username is null', () => {
        const username = null
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })

    it('should fail when username is an object', () => {
        const username = {}
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })

    it('should fail when username is an array', () => {
        const username = []
        const password = '123'
        try {
            userApi.register(username, password)
        } catch (error) {
            expect(error.message).toEqual(`${username} is not a string`);

        }
            
    })
    
    
    