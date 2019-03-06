import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ property }) => {
    const { index, picture, name } = property;
    return (
        <div id={`card-${index}`} className="card">
            <img src={picture} alt={name} />
            <div className="details">
                <span className="index">{index + 1}</span>
                <p className="location">
                    {name}

                </p>
            </div>
        </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;