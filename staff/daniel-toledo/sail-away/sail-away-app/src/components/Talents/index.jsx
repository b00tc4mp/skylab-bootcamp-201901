'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data } from 'sail-away-data'


function Talents({ getChecks, initialChecks }) {

    let [checked, setChecked] = useState(initialChecks)

    function handleChange(offer) {
        let index = checked.findIndex(selectedOffer => selectedOffer === offer)
        if (index === -1) checked = [...checked, offer]
        else { checked.splice(index, 1) }

        setChecked(checked)
        getChecks(checked)
    }

    useEffect(()=>{
        setChecked(checked)
    },[checked])

    return (<main className="journey">

        <div className='row'>
            {
                data.talents.map(category => {
                    return (<section className='col-12 col-sm-6 col-md-4 col-lg-2'>
                        <h6>{category.category}</h6>
                        {
                            category.offers.map(offer =>
                                <div key={offer}>
                                    <input
                                        type="checkbox"
                                        name={offer}
                                        checked={!!(checked.find(selectedOffer => selectedOffer === offer))}
                                        onChange={() => handleChange(offer)} />
                                    <label>{offer}</label>
                                </div>

                            )

                        }
                    </section>)
                })
            }
        </div>
    </main>)
}

export default withRouter(Talents)