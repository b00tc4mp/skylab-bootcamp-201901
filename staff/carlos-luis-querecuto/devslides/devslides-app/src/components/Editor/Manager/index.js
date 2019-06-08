import React, { useState } from 'react';

function Manager ({styles}){


    const handleMods = () => {
        let css = document.getElementById("modifier").value
        styles(css)
        console.log(css)
    }

    return (
        <textarea id="modifier" className="modifier" onChange={handleMods}>
            background-color: white
        </textarea>
    );
    
}

export default Manager;