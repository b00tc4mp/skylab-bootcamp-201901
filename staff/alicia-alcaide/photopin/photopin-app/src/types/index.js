import PropTypes from "prop-types";

const { shape, number, string, bool, arrayOf } = PropTypes;

export const coordinateType = shape({
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
});

export const placeType = shape({
  id: string.isRequired,
  title: string.isRequired,
  collection: string.isRequired,
  showInfo: bool.isRequired,
  geometry: shape({
    location: coordinateType.isRequired
  }).isRequired
});
