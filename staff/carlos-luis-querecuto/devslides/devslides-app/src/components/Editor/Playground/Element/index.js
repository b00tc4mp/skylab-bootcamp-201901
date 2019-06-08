import React, { useState } from 'react';

function Element() {

    const { object, setObject } = useState(null)

    const handleclick = () => {
        this.props.clicked(this)
    }

    return (
        <div className="basic" onClick={handleclick}>
            
        </div>
    );

}

export default Element;