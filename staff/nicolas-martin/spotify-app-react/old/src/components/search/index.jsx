class Search extends React.Component {

    constructor () {
      super()
      this.state = {
        queryInput: ''
      }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        try {
          logic.searchArtists(this.state.queryInput, function(error, artist){
              if (artist.length) console.log('hay resultados', artist)
              else console.log('no hay resultados', artist, error)
          })
        } catch (error) {
          console.log('Error', error)
        }
    }

    handleChange = (e) => {
      e.preventDefault()
      this.setState( { queryInput: e.target.value} )
    }

    render () {
      return( 
        <section className="search">
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor='queryInput'>Artist</label>
            <input 
              placeholder='search for an artist'
              name='queryInput'
              id='queryInput'
              ref={ query => this.inputName = query }
              onChange={ this.handleChange }
              value={ this.state.queryInput } // esto hace que los input sean controlados
              autoComplete='off'
            />
            <button>Search</button>
          </form>
        </section> 
      )
    }
  }