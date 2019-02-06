import ticketmasterApi from ".";

describe('ticketmaster-api', () => {

    describe('searchEvents', () => {
        const query = 'Barcelona'
        const startDate = '2019-06-01'
        const endDate = '2019-08-01'
        const startDateNew = '2019-10-01'
        const endDateNew = '2019-04-01'

        it('should succeed on correct query', () => 
            ticketmasterApi.searchEvents(query)
                .then(events => {
                    expect(events).toBeDefined()
                    expect(events[0].name).toBe(' Metallica: WorldWired Tour')
                })
        )  
        
        it('should succeed on correct query, startDate & endDate', () =>
                ticketmasterApi.searchEvents(query,startDate,endDate)
                    .then(events => {
                        expect(events).toBeDefined()
                        expect(events[0].name).toBe('Ed Sheeran')
                    })
        )
        
        it('should succeed on correct query & startDate ', () =>
                ticketmasterApi.searchEvents(query,startDateNew)
                    .then(events => {
                        expect(events).toBeDefined()
                        expect(events[0].name).toBe('Kissin\' Dynamite')
                    })
        )

        it('should succeed on correct query & endDate ', () =>
                ticketmasterApi.searchEvents(query,null,endDateNew)
                    .then(events => {
                        expect(events).toBeDefined()
                        expect(events[0].name).toBe('Billie Eilish')
                    })
        )

        it('should fail on empty query', () =>
            expect(() => {
                ticketmasterApi.searchEvents('')
            }).toThrow(Error('query is empty'))
        )

        it('should fail on null query', () =>
            expect(() => {
                ticketmasterApi.searchEvents(null)
            }).toThrow(TypeError(`${null} introduced is not a string`))
        )
        
        it('should fail on array query', () =>
            expect(() => {
                ticketmasterApi.searchEvents([])
            }).toThrow(TypeError(`${[]} introduced is not a string`))
        )

        it('should fail on boolean query', ()=>
            expect(() => {
                ticketmasterApi.searchEvents(true)
            }).toThrow(TypeError(`${true} introduced is not a string`))
        )
    })

    describe('searchEvent', () => {
        const id = 'Z698xZ2qZad1S'
        // const badID = 'Z698xZ2qZa'

        it('should succeed on correct id', () =>
            ticketmasterApi.searchEvent(id)
                .then(event => {
                    expect(event).toBeDefined()
                    expect(event.name).toBe(" Metallica: WorldWired Tour")
                })
        )

        it('should fail on empty id', () =>
            expect(() => {
                ticketmasterApi.searchEvent('')
            }).toThrow(Error('id is empty'))
        )

        it('should fail on null id', () =>
            expect(() => {
                ticketmasterApi.searchEvent(null)
            }).toThrow(TypeError(`-->${null}<-- id introduced is not a string`))
        )
        
        it('should fail on array id', () =>
            expect(() => {
                ticketmasterApi.searchEvent([])
            }).toThrow(TypeError(`-->${[]}<-- id introduced is not a string`))
        )

        it('should fail on boolean id', ()=>
            expect(() => {
                ticketmasterApi.searchEvent(true)
            }).toThrow(TypeError(`-->${true}<-- id introduced is not a string`))
        )
    })
})