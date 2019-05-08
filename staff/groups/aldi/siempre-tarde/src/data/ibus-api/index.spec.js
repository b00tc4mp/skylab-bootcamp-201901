import iBusApi from '.'
import { TimeoutError, ConnectionError, RequirementError, NotFoundError } from '../../common/errors'


const {env: {REACT_APP_APP_ID, REACT_APP_APP_KEY } } = process

iBusApi.APP_ID = REACT_APP_APP_ID
iBusApi.APP_KEY = REACT_APP_APP_KEY


describe('ibus-api', () => {
    
    const stop_id = 1775
    const line_id = 123


    describe('retrieve by stop id', () => {


        it('should succeed on correct bus stop id', () => {
            return iBusApi.retrieveStopId(stop_id)
                .then(response => {
                    const { status, data: { ibus } } = response

                    expect(status).toBe('success')
                    expect(ibus).toBeDefined()
                    expect(ibus instanceof Array).toBeTruthy()

                    ibus.forEach(element => {
                        const { line, "t-in-min": t_in_min, "t-in-s": t_in_s, "text-ca": text_ca } = element
                        expect(typeof line === 'string').toBeTruthy()
                        expect(typeof t_in_min === 'number').toBeTruthy()
                        expect(typeof t_in_s === 'number').toBeTruthy()
                        expect(typeof text_ca === 'string').toBeTruthy()

                    })
                })
            }
        )

        it('should fail on incorrect bus stop id', () => {
            return iBusApi.retrieveStopId(99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {

                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
            }
        )
        it('should fail on undefined bus stop id', () => {
            expect(() => iBusApi.retrieveStopId(undefined)).toThrowError(RequirementError,'stop is not optional')
        })

        

    })

    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = iBusApi.__url__

            iBusApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            iBusApi.retrieveStopId(stop_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

        afterEach(() => iBusApi.__url__ = url)
    })

    describe('when server responds too late', () => {
        const timeout = 1

        beforeEach(() => iBusApi.__timeout__ = timeout)

        it('should fail on too long wait', () =>
            iBusApi.retrieveStopId(stop_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof TimeoutError).toBeTruthy()
                    expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                })
        )

        afterEach(() => iBusApi.__timeout__ = 0)
    })

    describe('retrieve by line & stop id', () => {


        it('should succeed on correct line & bus stop id', () =>  {
            return iBusApi.retrieveLineId(stop_id, line_id)
                .then(response => {
                    const { status, data: { ibus } } = response

                    expect(status).toBe('success')
                    expect(ibus).toBeDefined()
                    expect(ibus instanceof Array).toBeTruthy()

                    ibus.forEach(element => {
                        const { destination, "t-in-min": t_in_min, "t-in-s": t_in_s, "text-ca": text_ca } = element
                        expect(typeof destination === 'string').toBeTruthy()
                        expect(typeof t_in_min === 'number').toBeTruthy()
                        expect(typeof t_in_s === 'number').toBeTruthy()
                        expect(typeof text_ca === 'string').toBeTruthy()

                    })
                })
            }
        )

        it('should fail on incorrect bus stop id', () => {
            return iBusApi.retrieveLineId(99999, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
            }
        )

        it('should fail on incorrect line id', () => {
            return iBusApi.retrieveLineId(stop_id, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
            }
        )

        it('should fail on undefined bus stop id', () =>

            expect(() => iBusApi.retrieveLineId(undefined, line_id)).toThrowError(RequirementError,'stop is not optional')
       
        )

        it('should fail on undefined line id', () =>
             expect(() => iBusApi.retrieveLineId(stop_id,undefined)).toThrowError(RequirementError,'line is not optional')
        )

    })

    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = iBusApi.__url__

            iBusApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            iBusApi.retrieveLineId(stop_id, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

        afterEach(() => iBusApi.__url__ = url)
    })

    describe('when server responds too late', () => {
        const timeout = 1

        beforeEach(() => iBusApi.__timeout__ = timeout)

        it('should fail on too long wait', () =>  {
            return iBusApi.retrieveLineId(stop_id, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof TimeoutError).toBeTruthy()
                    expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                })
            }
        )

        afterEach(() => iBusApi.__timeout__ = 0)
    })






})