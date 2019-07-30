import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import DetailForm from './DetailForm'
import stylemap from '../Home/stylemap.js'
import logic from '../../logic'
import { toast } from 'react-toastify'



class TrackingDetail extends Component {

  state = { pois: [], tracker:{}, mapMode: false }

  error = this.props.error
  message = this.props.message
  mapDetail = undefined
  mapRefresh = undefined
  routeCoordinates = []
  routePath = []

  setRoutePath = async () =>{
    this.routePath = await new window.google.maps.Polyline({
      path: this.routeCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 10
    });

    this.routePath.setMap(this.mapDetail)
  }

  clearRoutePath = async () => {
    if(this.routeCoordinates.length >=1){

      for (let i = 0; i < this.routeCoordinates.length; i++) {
        this.routeCoordinates.pop();
      }
      this.routeCoordinates = []
    }
  }

  componentDidMount() {
    (async () => {
      const {match: { params: { serialNumber} }} = this.props
      await this.renderMap()

      const tracker = await logic.retrieveTrackerBySN(serialNumber)
      this.setState({tracker})
    })()
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&callback=initMap`)
    window.initMap = this.initMap
  }

  componentWillReceiveProps(props) {
    (async () => {
      await this.getCoords()
      this.setState({ mapMode: props.darkmode }, async () => await this.initMap())
    })()
  }

  getCoords = () => {
    if (this.mapDetail) {
      sessionStorage.setItem('lat', this.mapDetail.getCenter().lat())
      sessionStorage.setItem('lng', this.mapDetail.getCenter().lng())
      sessionStorage.setItem('zoom', this.mapDetail.getZoom())
    }
  }

  initMap = async () => {
    let lati
    let lngi
    if(this.routeCoordinates.length){
      lati = this.routeCoordinates[0].lat
      lngi = this.routeCoordinates[0].lng
    } else{
      lati = undefined
      lngi = undefined
    }

    const darkmode = this.props.darkmode

      this.mapDetail = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        minZoom: 4,
        center: {lat: lati || Number(sessionStorage.getItem('lat')) || 0, lng: lngi || Number(sessionStorage.getItem('lng')) || 0},
        disableDefaultUI: true,
        styles: darkmode ? stylemap : undefined
      });

      this.setRoutePath()

  }

  handleSubmitDetail = async(dateFrom,timeFrom,dateTo,timeTo) =>{
    try{
      const dateF = dateFrom.split('-')
      const timeF = timeFrom.split(':')
      const dateT = dateTo.split('-')
      const timeT = timeTo.split(':')
      const startTime = (new Date(dateF[0],dateF[1]-1,dateF[2],timeF[0],timeF[1])).toUTCString()
      const endTime =  (new Date(dateT[0],dateT[1]-1,dateT[2],timeT[0],timeT[1])).toUTCString()
      const tracks = await logic.retrieveRangeOfTracks(this.state.tracker._id, startTime, endTime)
      await this.clearRoutePath()
      tracks.forEach(item=>{
      this.routeCoordinates.push({lat:item.latitude, lng:item.longitude})})
      await this.renderMap()
    }
    catch(error){
      toast.error(error.message)
    }
  }

  render() {

    const{
      state : {tracker},
      handleSubmitDetail
    }=this

    return <main>
      <section className="columns">
        <div className="column-detail column is-3">
        <div className="detail-field field">
        <DetailForm onSubmitDetail={handleSubmitDetail} licensePlate={tracker.licensePlate} serialNumber={tracker.serialNumber}/>
        </div>
        </div>
        <div className="column-detail2 column is-9">
          <div className="map-map" id="map"></div>
        </div>
      </section>
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

export default withRouter(TrackingDetail)