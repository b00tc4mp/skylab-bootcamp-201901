import React from "react"
// import PropTypes from "prop-types"

const Marker = ({ text })  => {

  const pointStyles = {
    border: "3px solid red",
    borderRadius: "50%",
    height: 16,
    width: 16,
    backgroundColor: "blue",
    cursor: "pointer",
    zIndex: 10
  }

    return (
        <Marker style={pointStyles}>
            {text}
        </Marker>
    )
}

// Marker.defaultProps = {
//     onClick: null
// }

// Marker.propTypes = {
//     onClick: PropTypes.func,
// }

export default Marker
