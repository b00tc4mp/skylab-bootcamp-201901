import { 
    ValueError, 
    FormatError, 
    RequirementError, 
    ConnectionError,
    TimeoutError,
    LogicError  
} from ".";

describe('errors', () => {
    // beforeEach(() => {
        let error
    // })
        
    it('should succed on a new ValueError', () => {
        error = new ValueError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })

    it('should succed on a new FormatError', () => {
        error = new FormatError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })

    it('should succed on a new RequirementError', () => {
        error = new RequirementError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })

    it('should succed on a new ConnectionError', () => {
        error = new ConnectionError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })

    it('should succed on a new TimeoutError', () => {
        error = new TimeoutError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })

    it('should succed on a new LogicError', () => {
        error = new LogicError
        expect(error).toBeDefined()
        expect(error instanceof Error).toBeTruthy()
        expect(typeof error).toBe('object')
    })
})