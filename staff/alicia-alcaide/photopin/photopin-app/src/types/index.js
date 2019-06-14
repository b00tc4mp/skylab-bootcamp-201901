import PropTypes from "prop-types";

const { shape, number, string, bool, object, arrayOf } = PropTypes;

export const coordinateType = shape({
  lat: number.isRequired,
  lng: number.isRequired
});

export const placeType = shape({
  id: string.isRequired,
  title: string.isRequired,
  description: string,
  urlImage: string,
  bestTimeOfYear: string,
  bestTimeOfDay: string,
  photographyTips: string,
  travelInformation: string,
  collection: string,
  showInfo: bool,
  visible: bool,
  geometry: shape({
    location: coordinateType.isRequired
  })
});

export const collectionType = shape({
  title: string.isRequired,
  pins: arrayOf(object).isRequired
});

export const pmapType = shape({
  title: string.isRequired,
  description: string.isRequired,
  coverImage: string,
  tags: arrayOf(string),
  author: string.isRequired,
  isPublic: bool.isRequired,
  collections: arrayOf(collectionType)
});

export const pinType = shape({
  title: string.isRequired,
  description: string,
  urlImage: string,
  bestTimeOfYear: string,
  bestTimeOfDay: string,
  photographyTips: string,
  travelInformation: string,
  coordinates: shape({
    latitude: number,
    longitude: number
  })
});
