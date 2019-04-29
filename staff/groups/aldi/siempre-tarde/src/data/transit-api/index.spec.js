import transitApi from '.'
import { ConnectionError, RequirementError, NotFoundError } from '../../common/errors'


describe('transit api', () => {

    const app_id = '89d2372e'
    const app_key = 'd94caab45f16f23e4ab1925e7e4cbbb8'

    const stop_id = 1775
    const line_id = 123


    describe('getBusLine', () => {

        it('should succeed on correct bus line', () => {
            transitApi.retrieveBusLine(app_id, app_key, line_id)
                .then(response => {
                    expect(response).toBeDefined()

                    const { totalFeatures, features: [{ properties: { "CODI_LINIA": _line_id } }] } = response

                    expect(typeof totalFeatures).toBe('number')
                    expect(totalFeatures).toBe(1)

                    expect(typeof _line_id).toBe('number')
                    expect(_line_id).toBe(line_id)
                })
        })


        it('should succeed on all bus line', () => {
            transitApi.retrieveBusLine(app_id, app_key, undefined)
                .then(response => {
                    expect(response).toBeDefined()

                    const { totalFeatures, features: [properties] } = response

                    expect(totalFeatures).toBeGreaterThan(0)

                    properties.forEach(prop => {
                        const { "CODI_LINIA": codi_linea,
                            "NOM_LINIA": nom_linia,
                            "DESC_LINIA": desc_linia,
                            "COLOR_LINIA": color_linia,
                            "COLOR_TEXT_LINIA": color_text_linia
                        } = prop

                        expect(codi_linea).toBeDefined()
                        expect(nom_linia).toBeDefined()
                        expect(desc_linia).toBeDefined()
                        expect(color_linia).toBeDefined()
                        expect(color_text_linia).toBeDefined()
                    })
                })
        })


        it('should fail on incorrect bus line', () => {
            transitApi.retrieveBusLine(app_id, app_key, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })

        it('should fail on incorrect app_id', () => {
            transitApi.retrieveBusLine('fake_app_id', app_key, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })


        it('should fail on incorrect app_key', () => {
            transitApi.retrieveBusLine(app_id, 'fake_app_key', line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })

    })


    describe('retrieveBusLineRoute', () => {

        it('should succeed on correct bus line', () => {
            transitApi.retrieveBusLineRoute(app_id, app_key, line_id)
                .then(response => {
                    expect(response).toBeDefined()

                    const { totalFeatures, features } = response

                    expect(totalFeatures).toBe(2)
                    expect(features.length).toBe(totalFeatures)

                    features.forEach(fea => {
                        const {
                            properties: { "DESTI_SENTIT": desti_sentit }
                        } = fea
                        expect(desti_sentit).toBeDefined()
                    })
                })
        })


        it('should fail on incorrect bus line', () => {
            transitApi.retrieveBusLineRoute(app_id, app_key, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })

        it('should fail on undefined bus line', () =>
            expect(() => transitApi.retrieveBusLineRoute(app_id, app_key, undefined)).toThrowError(RequirementError,'stop is not optional')
        )

        it('should fail on incorrect app_id', () => {
            transitApi.retrieveBusLineRoute('fake_app_id', app_key, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })


        it('should fail on incorrect app_key', () => {
            transitApi.retrieveBusLineRoute(app_id, 'fake_app_key', line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })

    })


    describe('retrieveBusStops', () => {

        it('should succeed on correct bus line', () => {
            transitApi.retrieveBusStops(app_id, app_key, line_id)
                .then(response => {
                    expect(response).toBeDefined()

                    const { totalFeatures, features } = response

                    expect(totalFeatures).toBeGreaterThan(0)

                    features.forEach(fea => {
                        const {
                            properties: { "CODI_LINIA": codi_linia }
                        } = fea
                        expect(codi_linia).toBe(line_id)
                    })
                })
        })



        it('should fail on incorrect bus line', () => {
            transitApi.retrieveBusStops(app_id, app_key, 99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })

        it('should fail on undefined bus line', () =>
            expect(() => transitApi.retrieveBusStops(app_id, app_key, undefined)).toThrowError(RequirementError,'stop is not optional')
        )

        it('should fail on incorrect app_id', () => {
            transitApi.retrieveBusStops('fake_app_id', app_key, line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })


        it('should fail on incorrect app_key', () => {
            transitApi.retrieveBusStops(app_id, 'fake_app_key', line_id)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        })

    })

})
