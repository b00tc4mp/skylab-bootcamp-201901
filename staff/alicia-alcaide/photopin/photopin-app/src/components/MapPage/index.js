import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import literals from "./literals";
import logic from "../../logic";
import MapSection from "./MapSection"
import './index.sass'

class MapPage extends Component {
  state = { pmap: null, mapId: this.props.match.params.id, 
            error: null, addingCollection: false
          };

  componentDidMount() {
    logic.isUserLoggedIn &&
      logic
        .retrieveUserMap(this.state.mapId)
        .then(pmap => this.setState({ pmap }))
        .catch(error => this.setState({ error: error.message }));
  }


/*
componentDidMount() {
        const { pmap } = this.props
        let places = []

        debugger

        pmap && pmap.collections && pmap.collctions.map(collection => {
            collection.pins && collection.pins.map(pin => {
            places.push({title: pin.title, lat : pin.coordinates.latitude, lng: pin.coordinates.longitude})
            })
        })
        this.setState(places)
    }
*/


  handleNewCollection = () => {
    this.setState({addingCollection : true})
  }

  
  handleSubmit = (e) =>{
    e.preventDefault()
    
    const {
      newCollection: { value: newCollection }
    } = e.target
    
    (async() => {
      try {

        const newCollections = [...this.state.pmap.collections, {title: newCollection, pins:[]}]

        await logic.createMapCollection(this.state.pmap._id, newCollections)

        this.setState ({ pmap : {collections: newCollections}})
        this.setState({addingCollection : false})
      } catch (error) {
        this.setState({error})
      }
    })()
    
  }

  render() {
    const {
      state: { pmap, mapId, error, addingCollection, places },
      props: { lang },
      handleNewCollection,
      handleSubmit
    } = this;

    const { title, addCollection, add, newCollection } = literals[lang];

    return (< main>
      {pmap && <h2>{pmap.title}</h2>}
      <section className="mapPage">
        <div className="mapPage__Container">
          <button className="mapPage__Container--addCollection" onClick={() => handleNewCollection()}>{addCollection}</button>
           {addingCollection &&
           <section>
            <form onSubmit={handleSubmit}>
              <input type="text" name="newCollection" placeholder={newCollection}/>
              <button type="submit">{add}</button>
              {error && <span>{error}</span>}
            </form>
          </section>
          }
          <section className="mapPage__Collections">
            {pmap && pmap.collections &&
              <ul>
                { pmap.collections.map(collection =>{
                      return (
                      <li key={collection.title}>
                          <h4>{collection.title}</h4>
                          {collection.pins &&
                          <ul>
                            {collection.pins.map(pin => {
                              return (<li key={pin._id}>
                                  <h4>{pin.title}</h4>
                                </li>
                              )}
                            )}
                          </ul>
                        }
                      </li>)
                  })
                }
              </ul>            
            }
          </section> 
          <MapSection pmap={pmap}/>
        </div>
      </section>
      </main>
    )
  }
}

export default withRouter(MapPage);
