import iBusApi from '.'
import { TimeoutError, ConnectionError, RequirementError, NotFoundError } from '../../common/errors'

describe('ibus-api', () => {
    const app_id = '89d2372e'
    const app_key = 'd94caab45f16f23e4ab1925e7e4cbbb8'
    const stop_id = 1775
    const line_id = 123


    describe('retrieve by stop id', () => {


        it('should succeed on correct bus stop id', () =>
            iBusApi.retrieveStopId(app_id, app_key, stop_id)
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
        )

        it('should fail on incorrect bus stop id', () =>
            iBusApi.retrieveStopId(app_id, app_key, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {

                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        )
        it('should fail on undefined bus stop id', () => {

            expect(() => iBusApi.retrieveStopId(app_id, app_key, undefined)).toThrowError(RequirementError,'stop is not optional')

        })

        it('should fail on incorrect app_id', () =>
            iBusApi.retrieveStopId('fake_app_id', app_key, stop_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )
        it('should fail on incorrect app_key', () =>
            iBusApi.retrieveStopId(app_id, 'fake_app_key', stop_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

    })

    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = iBusApi.__url__

            iBusApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            iBusApi.retrieveStopId(app_id, app_key, stop_id)
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
            iBusApi.retrieveStopId(app_id, app_key, stop_id)
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


        it('should succeed on correct line & bus stop id', () =>
            iBusApi.retrieveLineId(app_id, app_key, stop_id, line_id)
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
        )

        it('should fail on incorrect bus stop id', () =>
            iBusApi.retrieveLineId(app_id, app_key, 99999, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        )

        it('should fail on incorrect line id', () =>
            iBusApi.retrieveLineId(app_id, app_key, stop_id, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        )

        it('should fail on undefined bus stop id', () =>

        expect(() => iBusApi.retrieveLineId(app_id, app_key, undefined, line_id)).toThrowError(RequirementError,'stop is not optional')
       
        )

        it('should fail on undefined line id', () =>
        expect(() => iBusApi.retrieveLineId(app_id, app_key, stop_id,undefined)).toThrowError(RequirementError,'line is not optional')
        )

        it('should fail on incorrect app_id', () =>
            iBusApi.retrieveLineId('fake_app_id', app_key, stop_id, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )
        it('should fail on incorrect app_key', () =>
            iBusApi.retrieveLineId(app_id, 'fake_app_key', stop_id, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

    })

    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = iBusApi.__url__

            iBusApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            iBusApi.retrieveLineId(app_id, app_key, stop_id, line_id)
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
            iBusApi.retrieveLineId(app_id, app_key, stop_id, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof TimeoutError).toBeTruthy()
                    expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                })
        )

        afterEach(() => iBusApi.__timeout__ = 0)
    })






})