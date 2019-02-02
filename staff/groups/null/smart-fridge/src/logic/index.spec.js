import logic from '.'

describe('logic', () => {
    describe('Calories Function', () => {
        let gender = 'female'
        let height = 161
        let weight = 60
        let birthDate = '1985/10/15'
        let activity = 'sedentary'
        it('should succeed with correct params', () => {
            
            const test = logic.caloriesCounter(gender, height, weight, birthDate, activity)

            expect(test).toEqual(1959)
        })
        it('should fail on boolean gender instead of string', () => {

            gender = true
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on object gender instead of string', () => {

            gender = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on object heigth instead of string', () => {

            gender = 'female'
            height = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(height + ' is not a number'))
        })
        it('should fail on out of range height', () => {

            height = 1200
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(Error(height + ' should be a number between 50 and 230'))
        })
        it('should fail on array weight instead of number', () => {

            height = 161
            weight = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(weight + ' is not a number'))
        })
        it('should fail on boolean weight instead of number', () => {

            weight = false
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(weight + ' is not a number'))
        })
        it('should fail on out of range weight', () => {

            weight = 213123
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(Error(weight + ' should be a number between 20 and 400'))
        })
        it('should fail on number birthDate instead of string', () => {

            weight = 60
            birthDate = 123213
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(birthDate + ' is not a string'))
        })
        it('should fail on object birthDate instead of string', () => {

            birthDate = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(birthDate + ' is not a string'))
        })
        it('should fail on object activity instead of string', () => {

            birthDate = '1985/10/15'
            activity = ''
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(Error('activity cannot be empty'))
        })
        it('should fail on array activity instead of string', () => {

            activity = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, activity)
            }).toThrow(TypeError(activity + ' is not a string'))
        })
    })
})