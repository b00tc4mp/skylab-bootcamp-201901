

import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";

import Feedback from "../Feedback";

import logic from "../../logic";
import "./index.sass";

const {
  env: { GOOGLE_MAPS_ID }
} = process

function MapRoute({ google, getMarkers, seaIdSelection, initialMarkers }) {
  let [markers, setMarkers] = useState(initialMarkers);
  const [sea, setSea] = useState(getSea(seaIdSelection));
  const [feedback, setfeedback] = useState("");

  useState(getSea(seaIdSelection));

  useEffect(() => {
    setSea(getSea(seaIdSelection));
    setMarkers(markers);
  }, [seaIdSelection, markers]);

  function getSea(id) {
    try {
      return logic.retrieveSea(id);
    } catch (error) {
      setfeedback(error.message);
    }
  }

  function generateRoute(markers) {
    let route = [];
    markers.forEach(({ position }) => route.push(position));
    return route;
  }

  function onMarkerDragEnd(t, map, coord, index) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    let newPosition = { lat, lng };

    markers[index].position = newPosition;
    markers = [...markers];

    setMarkers(markers);
    getMarkers(markers);
  }

  function mapClicked(mapProps, map, clickEvent) {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();

    let newMarker = {
      name: "new marker",
      position: {
        lat,
        lng
      }
    };

    markers = [...markers, newMarker];

    setMarkers(markers);
    getMarkers(markers);
  }

  function onMarkerClick(index) {
    markers.splice(index, 1);
    markers = [...markers];

    setMarkers(markers);
    getMarkers(markers);
  }

  return (
    <div>
      <Map
        google={google}
        containerStyle={{ position: "relative", height: "50vh" }}
        style={{
          width: "100%",
          height: "100%"
        }}
        initialCenter={{
          lat: sea.center.lat,
          lng: sea.center.lng
        }}
        center={
          !markers.length && {
            lat: sea.center.lat,
            lng: sea.center.lng
          }
        }
        zoom={sea.zoom}
        onClick={(mapProps, map, clickEvent) =>
          mapClicked(mapProps, map, clickEvent)
        }
      >
        {markers.map((marker, index) => {
          if (index === 0) {
            return (
              <Marker
                position={marker.position}
                draggable={true}
                animation={google.maps.Animation.DROP}
                onDragend={(t, map, coord) =>
                  onMarkerDragEnd(t, map, coord, index)
                }
                onClick={() => onMarkerClick(index)}
                name={marker.name}
              />
            );
          } else {
            return (
              <Marker
                position={marker.position}
                draggable={true}
                onDragend={(t, map, coord) =>
                  onMarkerDragEnd(t, map, coord, index)
                }
                onClick={() => onMarkerClick(index)}
                name={marker.name}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "#00F",
                  fillOpacity: 0.6,
                  strokeColor: "#00A",
                  strokeOpacity: 0.9,
                  strokeWeight: 1,
                  scale: 3
                }}
              />
            );
          }
        })}

        {
          <Polyline
            path={generateRoute(markers)}
            options={{
              strokeColor: "#0000ff",
              strokeOpacity: 1,
              strokeWeight: 2,
              icons: [
                {
                  icon: "hello",
                  offset: "0",
                  repeat: "10px"
                }
              ]
            }}
          />
        }
      </Map>
      {feedback ? <Feedback message={feedback} /> : <div />}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_ID
})(MapRoute);
