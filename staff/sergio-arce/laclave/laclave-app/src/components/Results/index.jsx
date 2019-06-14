import React, { Component } from 'react'
import logic from '../../logic'
import Item from '../Item'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

class Results extends Component {

  state = { favorites: false }
    
    componentWillMount() {
       if(logic.isUserLoggedIn) this.handleRetrieveUser()
    }

    // componentDidMount() {
    //   if(this.props.onResults.length <= 0) toast.info("Oops! No results found.")
    // }

    handleRetrieveUser = () => {
      
        logic.retrieveUser()    
            .then(userData => {
                this.setState({ favorites: userData.favorites })
            })
            .catch(error => toast(error.message)) 
    }

    handleToggleFav = itemId => {
      
        try {
          logic.toggleFavorites(itemId) 

              .then(() => {
                  this.handleRetrieveUser()
                  if (this.props.onRefreshFav) this.props.onRefreshFav()
                  
              })
              .catch(error => toast(error.message)) 
        } catch (error) {
          
        }
    }

    handleDetail = itemId => {
      this.props.history.push(`/item/${itemId}`)
    }
  
    render() {

        const { state: { favorites }, props: { onResults }, handleToggleFav, handleDetail } = this
        
        return (

          <section className="results">

            {onResults.length ?
              
              onResults.map(item => {

              const isFav = favorites? favorites.some(fav => fav._id === item._id) : false

              return <Item 
                        onItem={item} 
                        onFav={isFav} 
                        onToggleFav={handleToggleFav}
                        onDetail={handleDetail}
                        />

              }) :

              <p className="results__message">You have no results</p>
                 
            }
            
          </section>
        )
    }
}

export default withRouter(Results)
