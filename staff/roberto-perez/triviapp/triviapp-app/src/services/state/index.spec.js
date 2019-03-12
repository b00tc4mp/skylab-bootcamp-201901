describe('state', () => {
    const stateStorageKey = '__state__'

    it('should keep state on single value', () => {
        const state = new State(sessionStorage, stateStorageKey)

        state.set({ hello: 'world' })

        const __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('world')
    })

    it('should keep state on multiple value', () => {
        const state = new State(sessionStorage, stateStorageKey)

        state.set({ hello: 'world' })
        state.set({ hola: 'mundo' })

        __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('world')
        expect(__state__.hola).to.equal('mundo')
    })

    it('should update state on single value', () => {
        const state = new State(sessionStorage, stateStorageKey)

        state.set({ hello: 'world' })

        let __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('world')

        state.set({ hello: 'mundo' })

        __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('mundo')
    })

    it('should update state on multiple value', () => {
        const state = new State(sessionStorage, stateStorageKey)

        state.set({ hello: 'world' })
        state.set({ hello: 'mundo' })

        __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('world')
        expect(__state__.hola).to.equal('mundo')

        state.set({ hello: 'world!' })
        state.set({ hola: 'mundo!' })

        __state__ = JSON.parse(sessionStorage.getItem(stateStorageKey))

        expect(__state__.hello).to.equal('world!')
        expect(__state__.hola).to.equal('mundo!')
    })

    it('should retrieve state of single value', () => {
        const state = new State(sessionStorage, stateStorageKey)

        sessionStorage.setItem(JSON.stringify({ hello: 'world' }))

        const { hello } = state.get()

        expect(hello).to.equal('world')
    })

    it('should retrieve state of multiple values', () => {
        const state = new State(sessionStorage, stateStorageKey)

        sessionStorage.setItem(JSON.stringify({ hello: 'world', hola: 'mundo' }))

        const { hello, hola } = state.get()

        expect(hello).to.equal('world')
        expect(hola).to.equal('mundo')
    })
})