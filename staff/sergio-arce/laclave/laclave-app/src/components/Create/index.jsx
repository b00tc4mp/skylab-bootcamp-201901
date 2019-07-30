import React, { Component } from 'react'
import CreateCongress from '../CreateCongress'
import CreateArtist from '../CreateArtist'

class Create extends Component {

    state =  { congressShow: true, artistShow: false }

    congressShow = () => this.setState({ congressShow: true, artistShow: false })

    artistShow = () => this.setState({ congressShow: false, artistShow: true })

    render() {

        const { state: { congressShow,  artistShow } } = this

        return (
            <section>
                <div className="create">
                    <h1>Acount Setting</h1>
                </div>

                {artistShow && <CreateArtist />} 
                {congressShow && <CreateCongress />}           

            </section>
        )
        
    }  
    
}

export default Create