import React, { useState, useEffect } from 'react';
import './index.sass'

function Manager({ dbStyles, setActualSlideStyle, setonChangeStyle }) {

    const [Globalstyles, setGlobalstyles] = useState(null)
    const handleStyle = (styles) => {
        if(dbStyles){
            if (!Globalstyles) {
                let style = document.createElement('style');
                style.type = "text/css"
    
                style.innerHTML = styles
                const ref = document.querySelector('meta');
                ref.parentNode.insertBefore(style, ref);
            } else {
                var style = document.querySelectorAll('style');
                style[2].innerHTML = styles
            }
        }
        setGlobalstyles(styles)
    }

    useEffect(()=>{ 
        document.getElementById("modifier").value = dbStyles
        handleStyle(dbStyles)
    },[dbStyles])

    const handleMods = () => {
        var textareas = document.getElementsByTagName('textarea');
            var count = textareas.length;
            for(var i=0;i<count;i++){
                textareas[i].onkeydown = function(e){
                    if(e.keyCode==9 || e.which==9){
                        e.preventDefault();
                        var s = this.selectionStart;
                        this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                        this.selectionEnd = s+1; 
                    }
                }
}
        let css = document.getElementById("modifier").value
        setActualSlideStyle(css)
        handleStyle(css)
        setonChangeStyle(true)
        
    }

    return (
        <textarea id="modifier" spellcheck="false" className="modifier" onChange={handleMods}>
        </textarea>
    );

}

export default Manager;