import React, { useState } from 'react'
import Maps from '../Maps'
import { withRouter } from 'react-router-dom'
import './index.sass'

function LocationSearch(props) {

    const handleAddUbication = (loc) => {
        props.history.push('/search/locations/' + loc)        
    }
    
    return (
        <Maps handleAddUbication={handleAddUbication} />  
        )
   

}
export default withRouter(LocationSearch)