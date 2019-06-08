import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import logic from "../../logic"
import NavBar from '../NavBar'
import MapSection from "./MapSection"
import CollectionSection from "./CollectionSection"
import './index.css'

class MapPage extends Component {
  state = { pmap: null, mapId: this.props.match.params.id, newPlace: null };

  componentDidMount() {
    logic.isUserLoggedIn &&
      logic
        .retrieveUserMap(this.state.mapId)
        .then(pmap => this.setState({ pmap }))
        .catch(error => this.setState({ error: error.message }))
  }


  handleNewCollection = (titleNewCollection) => {
    (async () => {
      try {
        const newCollections = [...this.state.pmap.collections, { title: titleNewCollection, pins: [] }]
        await logic.createCollection(this.state.pmap._id, titleNewCollection)
        this.setState({ pmap: { collections: newCollections } })
      } catch (error) {
        this.setState({ error })
      }
    })()
  }


  handleNewPin = async (newPin) => {
    if (newPin !== null) {
      try {
        const pin = {
          title: newPin.title,
          description: newPin.description,
          urlImage: newPin.urlImage,
          bestTimeOfYear: newPin.bestTimeOfYear,
          bestTimeOfDay: newPin.bestTimeOfDay,
          photographyTips: newPin.photographyTips,
          travelInformation: newPin.travelInformation,
          coordinates: {
            latitude: newPin.coordinates.latitude,
            longitude: newPin.coordinates.longitude
          }
        }
        const newPinId = await logic.createPin(this.state.pmap._id, newPin.collectionSel, pin)
        debugger
        try {
          const newPmap = await logic.retrieveUserMap(this.state.mapId)
          this.setState({ pmap: newPmap })
        } catch (error) {
          this.setState({ error: error.message })
        }
      } catch (error) {
        this.setState({ error })
      }
    }
  }


  render() {
    const {
      state: { pmap, mapId, newPlace },
      props: { lang, onLogout },
      handleNewCollection,
      handleNewPin
    } = this;

    return <div className="map-page">
      <NavBar lang={lang} onLogout={onLogout} />
      <div>
        {pmap && <h2 className='uk-text-center'>{pmap.title}</h2>}
        <div className="custom-flex">
          <section className="custom-flex_items-bar">
            <CollectionSection pmap={pmap} lang={lang} onNewCollection={handleNewCollection} />
          </section>
          <section className="custom-flex__content" >
            <MapSection pmap={pmap} lang={lang} onNewPin={handleNewPin} />
          </section>
        </div>
      </div>
    </div>
  }
}

MapPage.propTypes = {
  lang: PropTypes.string
};

export default withRouter(MapPage);
