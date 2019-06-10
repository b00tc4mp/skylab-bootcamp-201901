import React from 'react'

import './index.scss'

const CinemaModal = ({ handleCloseModal }) => {

    return (
        <div className="modal">
            <div className="modal__content">
                <i className="close-modal" onClick={handleCloseModal} />
                <section className="cinema">
                    <h2 className="cinema__title">Cinema Name</h2>

                    <ul className="cinema__movies">
                        <li className="movie__item">
                            <img />
                            <div>
                                <p>Movie title</p>
                                <p>Movie info</p>
                                <p>Movie cast</p>
                            </div>
                            <i className="show-sessions" />
                        </li>
                    </ul>
                </section>
                <div className="layer" onClick={handleCloseModal}></div>
            </div>
        </div>
    )
}

export default CinemaModal
