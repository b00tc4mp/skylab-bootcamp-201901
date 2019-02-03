import logic from "../logic/index";
//import api...



describe('logic' , () => {
    
    
    describe('searchItems' , () => {
        
        
        it('should succeed on mathing query' , () => {
            const query = 'titanic'
            
            return logic.searchItems(query)
            .then(items => {
                expect(items).toBeDefined()
                expect(items instanceof Array).toBeTruthy()
                expect(items.length).toBeGreaterThan(0)
            })
        })

        it('should fail on empty query' , () => {
            const query = ''
            expect(() => logic.searchItems(query).toThrowError('query is empty'))   
           
        })


    })

    // {
    //         Title: "Raise the Titanic", Year: "1980", Rated: "PG", Released: "01 Aug 1980", Runtime: "115 min", …}
    //         Actors: "Jason Robards, Richard Jordan, David Selby, Anne Archer"
    //         Awards: "3 nominations."
    //         BoxOffice: "N/A"
    //         Country: "UK, USA"
    //         DVD: "21 Jan 2014"
    //         Director: "Jerry Jameson"
    //         Genre: "Action, Drama, Thriller, Adventure"
    //         Language: "English"
    //         Metascore: "N/A"
    //         Plot: "To obtain a supply of a rare mineral, a ship raising operation is conducted for the only known source, the R.M.S. Titanic."
    //         Poster: "https://m.media-amazon.com/images/M/MV5BM2MyZWYzOTQtMTYzNC00OWIyLWE2NWItMzMwODA0OGQ2ZTRkXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg"
    //         Production: "Associated Film Distribution"
    //         Rated: "PG"
    //         Ratings: (2) [{…}, {…}]
    //         Released: "01 Aug 1980"
    //         Response: "True"
    //         Runtime: "115 min"
    //         Title: "Raise the Titanic"
    //         Type: "movie"
    //         Website: "N/A"
    //         Writer: "Adam Kennedy (screenplay), Eric Hughes (adaptation), Clive Cussler (novel)"
    //         Year: "1980"
    //         imdbID: "tt0081400"
    //         imdbRating: "4.8"
    //         imdbVotes: "3,460"

    // }

    describe('retrieveItem' , () => {

        it('should succeed on mathing query' , () => {
            const itemId = 'tt0108778'
            //TODO
            return logic.retrieveItem(itemId)
            .then(item => {
                const {imdbID} = item
                expect(imdbID).toBeDefined()
                expect(imdbID).toBe(itemId)
                
            })

        })

        it('should fail on empty itemId', () => {
            const itemId = ''
            
            expect(() => logic.retrieveItemDetail(itemId)).toThrowError('itemId is empty')
        })
    })

})