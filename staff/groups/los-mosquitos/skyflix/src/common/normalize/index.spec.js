import normalize from '.'

describe('normalize', () => {
    describe('undefinedOrNull', () => {
        it('should succed on not-null and not-undefined value', () => {
            let value = Math.random()
            
            const result = normalize.undefinedOrNull(value)
            expect(result).toBeDefined()
            expect(result).toBe(value)
        })

        it('should return null on string null value', () => {
            let value = 'null'
            
            const result = normalize.undefinedOrNull(value)
            expect(result).toBeDefined()
            expect(result).toBe(null)
        })

        it('should return undefined on string undefined value', () => {
            let value = 'undefined'
            
            const result = normalize.undefinedOrNull(value)
            expect(result).toBeUndefined()
        })
    })
})