import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import CongressDetail from '../CongressDetail'
import ArtistDetail from '../ArtistDetail'

class Detail extends Component {
  state = { item: null } 

  componentWillMount() {

      const itemId = this.props.match.params.itemId
      try {
        logic.itemDetail(itemId)
        
          .then(item => {
            
            this.setState({item })
         
          })
      } catch (error) {
        
      }
  }

  render() {

      const { state: { item } } = this

      return (
  
        <section className="detail">

          {item && item.resultsType === "artist" && <ArtistDetail onItem={item}/>}
          {item && item.resultsType === "congress" && <CongressDetail onItem={item}/>}
        
        </section>
      )
  }
}

export default withRouter(Detail)