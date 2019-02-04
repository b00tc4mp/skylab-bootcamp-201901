import logic from "../logic/index";



describe('logic' , () => {
    
    
    describe('searchItems' , () => {
        
        
        it('should succeed on mathing query' , () => {
            const query = 'titanic'
            
            
            return logic.searchVideos(query)
            .then(items => {
                expect(items).toBeDefined()
                expect(items instanceof Array).toBeTruthy()
                expect(items.length).toBeGreaterThan(0)
            })
        })

        it('should fail on empty query' , () => {
            const query = ''
            expect(() => logic.searchVideos(query)).toThrowError('query is empty')
           
        })


    })

    
    describe('retrieveItem' , () => {

        it('should retrieve an item when correct itemId is used' , () => {
            const itemId = 'tt0108778'
            
            return logic.retrieveVideo(itemId)
            .then(item => {
                const {imdbID} = item
                expect(imdbID).toBeDefined()
                expect(imdbID).toBe(itemId)
            })

        })

        it('should fail on empty itemId', () => {
            const itemId = ''
            
            expect(() => logic.retrieveVideo(itemId)).toThrowError('itemId is empty')
        })
    })

})