import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import logic from "../../logic"
import MapSection from "./MapSection"
import CollectionSection from "./CollectionSection"

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
      props: { lang },
      handleNewCollection,
      handleNewPin
    } = this;

    return (< section>
      <div className="">
        {pmap && <h2>{pmap.title}</h2>}
        <section class="uk-flex uk-flex-between" className="mapPage">
          <section className="mapPage__Collections">
            <CollectionSection pmap={pmap} lang={lang} onNewCollection={handleNewCollection} />
          </section>
          <section className="mapPage__Map">
            <MapSection pmap={pmap} lang={lang} onNewPin={handleNewPin} />
          </section>
        </section>
      </div>
    </section>
    )
  }
}

MapPage.propTypes = {
  lang: PropTypes.string
};

export default withRouter(MapPage);
