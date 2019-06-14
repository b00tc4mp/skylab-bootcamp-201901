import React, { Component } from 'react'
import stylemap from './stylemap.js'
import logic from '../../logic'
import './index.sass'
import { toast } from 'react-toastify'



class Home extends Component {
  state = { pois: [], trackers: [], mapMode: false }

  map = undefined
  mapRefresh = undefined
  poiMark = []
  truckMark = []

  componentDidMount() {
    (async () => {
      await this.getPois()
      await this.renderMap()
      this.mapRefresh = setInterval(async () => {
        await this.clearTruckMarkers()
        await this.setPOIMarkers()
        await this.setTruckMarkers()
      }, 45000)

      window.addEventListener('click', this.infobutton)
    })()
  }

  infobutton = e => {
    if (e.target && e.target.id === 'deletePOI') {
      this.deletePOI(e.target.value)
    }
    if (e.target && e.target.id === 'deleteTracker') {
      this.deleteTracker(e.target.value)
    }
    if (e.target && e.target.id === 'detailTracker') {
      this.getCoords()
      this.props.onTrackDetail(e.target.value)
    }
  }

  componentWillReceiveProps(props) {
    (async () => {
      await this.getCoords()
      this.setState({ mapMode: props.darkmode }, async () => await this.initMap())
    })()
  }

  componentWillUnmount() {
    clearInterval(this.mapRefresh)
    window.removeEventListener('click', this.infobutton)
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&callback=initMap`)
    window.initMap = this.initMap
  }

  getCoords = () => {
    if (this.map) {
      sessionStorage.setItem('lat', this.map.getCenter().lat())
      sessionStorage.setItem('lng', this.map.getCenter().lng())
      sessionStorage.setItem('zoom', this.map.getZoom())
    }
  }

  getPois = async () => {
    try {
      const pois = await logic.retrieveAllPOI()
      return this.setState({
        pois: pois
      })

    }
    catch (err) {
      toast.error(err.message)
    }

  }

  getPositions = async () => {

    try {
      const trackers = await logic.retrieveAllLastTracks()
      return this.setState({
        trackers: trackers
      })

    }
    catch (err) {
      toast.error(err.message)
    }
  }

  clearPOIMarkers = async () => {
    const stop = this.poiMark.length

    for (let i = 0; i < stop; i++) {
      this.poiMark[i].setMap(null);
    }
    this.poiMark = []
    this.setState({pois:[]})
  }

  clearTruckMarkers = async () => {
    const stop = this.truckMark.length

    for (let j = 0; j < stop; j++) {
      this.truckMark[j].setMap(null);
    }
    this.truckMark = []
    this.setState({trackers:[]})
  }


  setPOIMarkers = async () => {

    await this.getPois()

    const infopoi = new window.google.maps.InfoWindow()

    this.state.pois.forEach(poi => {
      const poiImage = {
        url: `http://maps.google.com/mapfiles/ms/micons/${poi.color}.png`,
        size: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 32)
      }

      const marker = new window.google.maps.Marker({
        position: { lat: poi.latitude, lng: poi.longitude },
        map: this.map,
        animation: window.google.maps.Animation.DROP,
        icon: poiImage,
        title: poi.title
      })

      marker.addListener('click', () => {

        sessionStorage.setItem('poiID', poi._id)
        sessionStorage.setItem('poiName', poi.title)

        infopoi.setContent(`</p><h2>${poi.title}</h2></p><p>lat: ${poi.latitude}</p><p>lng: ${poi.longitude}</p><hr/><p><button style="width:100%" id="deletePOI" value=${poi._id}>DELETE</button></p>`)

        infopoi.open(this.map, marker)
      })
      return this.poiMark.push(marker)
    })
  }

  setTruckMarkers = async () => {

    await this.getPositions()
    const infotruck = new window.google.maps.InfoWindow()

    this.state.trackers.forEach(truck => {
      const truckImageON = {
        url: `http://maps.google.com/mapfiles/kml/pal4/icon62.png`,
        size: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 32)
      }
      const truckImageOFF = {
        url: `http://maps.google.com/mapfiles/kml/pal4/icon15.png`,
        size: new window.google.maps.Size(32, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 32)
      }

      const trucks = new window.google.maps.Marker({
        position: { lat: truck.latitude, lng: truck.longitude },
        map: this.map,
        animation: window.google.maps.Animation.DROP,
        icon: (truck.status == 'ON')? truckImageON : truckImageOFF,
        title: `SN: ${truck.serialNumber} - Speed:${truck.speed.toString()} Km/h`
      })

      trucks.addListener('click', () => {

        infotruck.setContent(`<p><h2>LP: ${truck.licensePlate}</h2></p><p>SN: ${truck.serialNumber}</p><hr/><p><button style="width:100%" id="detailTracker" value=${truck.serialNumber}>DETAIL</button></p><hr/><p><button style="width:100%" id="deleteTracker" value=${truck.serialNumber}>DELETE</button></p>`)

        infotruck.open(this.map, trucks)
      })
      return this.truckMark.push(trucks)
    })
  }

  initMap = () => {
    let lati = 40.41665
    let lngi = -3.703816

    const darkmode = this.props.darkmode

    if (this.state.pois.length >= 1) {
      lati = this.state.pois[0].latitude
      lngi = this.state.pois[0].longitude
    }

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: Number(sessionStorage.getItem('lat')) || lati, lng: Number(sessionStorage.getItem('lng')) || lngi },
      zoom: Number(sessionStorage.getItem('zoom')) || 8,
      minZoom: 3,
      disableDefaultUI: true,
      styles: darkmode ? stylemap : undefined
    })

    this.setPOIMarkers()
    this.setTruckMarkers()

  }

  deletePOI = async (idPOI) => {

    try {
      await logic.deletePOI(idPOI)
      await this.clearPOIMarkers()
      await this.clearTruckMarkers()
      await this.setPOIMarkers()
      await this.setTruckMarkers()
    }
    catch (err) {
      toast.error(err.message)
    }
  }
  deleteTracker = async (snTracker) => {

    try {
      const tracker = await logic.retrieveTrackerBySN(snTracker)
      await logic.deleteTracker(tracker._id)
      await this.clearTruckMarkers()
      await this.setPOIMarkers()
      await this.setTruckMarkers()
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  render() {
    return <main className="map-section">
      <div className="map-map" id="map"></div>
    </main>


  }
}


function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}


export default Home
