import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/icon_v2_black.png'
import literals from './literals'
import './index.css'

function MapList({ lang, maps }) {
    const { create } = literals[lang]

    return <>
        <div className="uk-text-center uk-grid uk-grid-small uk-grid-match uk-flex-first uk-child-width-1-3@m uk-child-width-1-2@s">
            {
                maps.map(map => {
                    return (
                        <div key={map._id} className="uk-margin-small-bottom">
                            <div className="uk-card uk-card-default uk-card-body">
                                <h4 className="uk-card-title"><Link className="card-link" to={`/map/${map._id}`}>{map.title}</Link></h4>
                                <div>
                                    <img src={map.coverImage} width="" height="" alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="uk-margin-small-bottom">
                <div className="uk-card uk-card-default uk-card-body">
                    <h4 className="uk-card-title uk-width-auto"><Link className="card-link" to="/mapform/5cfd56d2cd5dba2678860658">{create}</Link></h4>
                    <div>
                        <img src={logo} alt="logo-PhotoPin" width="180" height="180" />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default MapList