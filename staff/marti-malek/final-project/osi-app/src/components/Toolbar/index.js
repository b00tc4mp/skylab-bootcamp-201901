import React from 'react'
import './index.sass'

function Toolbar() {

    return <section className="toolbar">
        <div className="toolbar__logo"></div>
        <div className="toolbar__file"><i class="icon fas fa-file"><i class="sub-icon fas fa-plus"></i></i></div>
        <div className="toolbar__folder"><i class="icon fas fa-folder-plus"></i></div>
        <div className="toolbar__calc"><i class="icon fas fa-calculator"></i></div>
        <div className="toolbar__finder"><i class="icon fas fa-search"></i></div>
    </section>
}

export default Toolbar