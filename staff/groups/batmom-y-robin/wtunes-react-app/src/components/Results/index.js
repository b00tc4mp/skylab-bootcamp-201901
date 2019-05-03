import React from 'react'
import './index.sass'

function Results({ error, items, onPlayer }) {



    return <div className="results">
        <section className="container">
            <span className="help is-danger">{error}</span>
            <div className='columns is-multiline is-mobile is-centered'>
            {
            items.map(({ trackName, artistName, previewUrl, artWork, genere }) =>{

                return <div key={previewUrl} className="column is-4-desktop is-5-tablet is-8-mobile"  onClick={() => onPlayer(previewUrl)}>
                        <div className="box myBox">
                            <article className="media myImage">
                                <img src={artWork} />
                                <div className="media-content myContent">
                                    <div className="content">
                                        <h3 className='title is-4 myText'>{trackName.substring(0,35)}</h3>
                                        <h4 className="subtitle is-6 myText">{artistName}</h4>
                                        <p className="myText is-small">{genere}</p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                })
            }
            </div>
        </section>
    </div>
}

export default Results
