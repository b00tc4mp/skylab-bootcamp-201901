import ticketmasterApi from ".";

describe('ticketmaster-api', () => {

    describe('searchEvent', () => {
        const query = 'Barcelona'
        it('should succed on correct data', () =>
            ticketmasterApi.searchEvents(query)
                .then(data => expect(data).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )
    })
})