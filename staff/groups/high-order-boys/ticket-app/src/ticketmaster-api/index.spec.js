import ticketmasterApi from ".";

describe('ticketmaster-api', () => {

    describe('searchEvents', () => {
        const query = 'Barcelona'
        const startDate = '2019-06-01T14:00:00Z'
        const endDate = '2019-08-01T14:00:00Z'
        const startDateNew = '2019-10-01T14:00:00Z'
        const endDateNew = '2019-04-01T14:00:00Z'

        it('should succed on correct query', () => 
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
                        expect(events[0].name).toBe('  Shawn Mendes: The Tour')
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
})