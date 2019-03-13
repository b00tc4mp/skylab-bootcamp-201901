'use strict'
import React, {Component, Fragment} from 'react'
function TwoPages({pages}) {
    return (
        pages.map((page, i) => {
            return <div className="all">
                        <div className="page1">{pages[i+1]}</div>
                        <div className="page2">{pages[i+2]}</div>
                    </div>
        })
            

    )
}

export default TwoPages



