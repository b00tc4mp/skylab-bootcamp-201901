import React, { useState, useEffect } from 'react';

function Manager({ dbStyles, setActualSlideStyle }) {

    const [Globalstyles, setGlobalstyles] = useState(null)
    const handleStyle = (styles) => {
        if (Globalstyles) {
            let style = document.createElement('style');
            style.type = "text/css"

            style.innerHTML = styles
            const ref = document.querySelector('.manager');
            ref.parentNode.insertBefore(style, ref);
        } else {
            var style = document.querySelector('style');
            style.innerHTML = styles
        }
        setGlobalstyles(styles)
    }

    useEffect(()=>{ 
        document.getElementById("modifier").value = dbStyles
        handleStyle(dbStyles)
    },[dbStyles])

    const handleMods = () => {
        let css = document.getElementById("modifier").value
        setActualSlideStyle(css)
        handleStyle(css)
        
    }

    return (
        <textarea id="modifier" className="modifier" onChange={handleMods}>
        </textarea>
    );

}

export default Manager;