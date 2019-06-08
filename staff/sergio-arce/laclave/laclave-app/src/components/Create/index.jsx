import React, { Component } from 'react'

// import { toast } from "react-toastify"

import CreateCongress from '../CreateCongress'
import CreateArtist from '../CreateArtist'

class Create extends Component {

    state =  { congressShow: true, artistShow: false }

    // click en link de crear congreso
    congressShow = () => this.setState({ congressShow: true, artistShow: false })

    // click en link de crear artista
    artistShow = () => this.setState({ congressShow: false, artistShow: true })

    render() {

        const { state: { congressShow,  artistShow } } = this

        return (
            <section>
                <div className="create">
                    <h1>Acount Setting</h1>

                    {/* ******* enviar a la barra de menu ******** */}
                    {/* <button onClick={this.congressShow} className="create__button">Create Congress</button> 
                    <button onClick={this.artistShow} className="create__button">Create Artist</button> */}

                </div>

                {artistShow && <CreateArtist />} 

                {congressShow && <CreateCongress />}           

            </section>
        )
        
    }  
    
}

export default Create