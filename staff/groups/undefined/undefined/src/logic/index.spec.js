import logic from "../logic/index";




describe('ombd-api' , () => {
    
    
    describe('search items' , () => {
        
        
        it('should succeed on mathing query' , () => {
            const query = 'titanic'
            
            return logic.searchItems(query)
            .then(list => {
                expect(list).toBeDefined()
                expect(list instanceof Array)
                expect(list.length).toBeGreaterThan(0)
            })
        })

        it('should fail on empty quety' , () => {
            const query = ''
            expect(() => logic.searchItems(query, function(error,item){})).toThrowError('query is empty')      
           
        })

    })

    describe('retrieve item detail' , () => {

        it('should succed on mathing query' , () => {
            const itemId = 'tt0108778'
            
            return logic.retrieveItemDetail(itemId)
            .then(item => {
                expect(itemId).toBeDefined()
                
                const {id} = item

                expect(id).toBe(itemId)
                
            })

        })

        it('should fail on empty itemId', () => {
            const itemId = ''
            
            expect(() => logic.retrieveItemDetail(itemId)).toThrowError('itemId is empty')
        })
    })

})