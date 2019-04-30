import transitApi from '.'
import { ConnectionError, RequirementError, NotFoundError } from '../../common/errors'


const {env: {REACT_APP_APP_ID, REACT_APP_APP_KEY } } = process

transitApi.APP_ID = REACT_APP_APP_ID
transitApi.APP_KEY = REACT_APP_APP_KEY



describe('transit api', () => {


    const stop_id = 1775
    const line_id = 123


    describe('getBusLine', () => {

        it('should succeed on correct bus line', () => {
            return transitApi.retrieveBusLine(line_id)
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
            return transitApi.retrieveBusLine(undefined)
                .then(response => {
                    expect(response).toBeDefined()
                    debugger

                    const { totalFeatures, features } = response

                    expect(totalFeatures).toBeGreaterThan(0)

                    features.forEach(prop => {
                        debugger
                        const {properties : { "CODI_LINIA": codi_linea,
                            "NOM_LINIA": nom_linia,
                            "DESC_LINIA": desc_linia,
                            "COLOR_LINIA": color_linia,
                            "COLOR_TEXT_LINIA": color_text_linia }
                        } = prop

                        expect(codi_linea).toBeDefined()
                        expect(nom_linia).toBeDefined()
                        expect(desc_linia).toBeDefined()
                        expect(color_linia).toBeDefined()
                        expect(color_text_linia).toBeDefined()
                    })
                })
        }, 10000)


        it('should fail on incorrect bus line', () => {
            return transitApi.retrieveBusLine(99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })


    })


    describe('retrieveBusLineRoute', () => {

        it('should succeed on correct bus line', () => {
            return transitApi.retrieveBusLineRoute(line_id)
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
        }, 10000)


        it('should fail on incorrect bus line', () => {
            return transitApi.retrieveBusLineRoute(99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })

        it('should fail on undefined bus line', () =>
            expect(() => transitApi.retrieveBusLineRoute(undefined)).toThrowError(RequirementError,'stop is not optional')
        )

    })


    describe('retrieveBusStops', () => {

        it('should succeed on correct bus line', () => {
            return transitApi.retrieveBusStops(line_id)
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
            return transitApi.retrieveBusStops(99999)
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof NotFoundError).toBeTruthy()
                    expect(error.message).toBe('cannot found')
                })
        })

        it('should fail on undefined bus line', () =>
            expect(() => transitApi.retrieveBusStops(undefined)).toThrowError(RequirementError,'stop is not optional')
        )


    })

})
