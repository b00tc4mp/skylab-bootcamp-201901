'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import data from '../../data'

import './index.sass'

function Talents({ getChecks, initialChecks }) {

    const [checked, setChecked] = useState(initialChecks)

    function handleChange(e) {
        !checked.includes(e.target.name)
            ?
            setChecked([...checked, e.target.name])
            :
            setChecked(checked.filter(c => c !== e.target.name))

        getChecks(checked)
    }

    useEffect(() => {
        setChecked(checked)
        getChecks(checked)

    }, [checked, getChecks])

    return (<main className="talents">
        <div className='talents__container'>
            {
                data.talents.map(category => {
                    return (<section className='talents__category' key={category.category}>
                        <h6 className='talents__category-title'>{category.category}</h6>
                        {
                            category.offers.map(offer =>
                                <div key={offer} className='talents__talent'>
                                    <input
                                        type="checkbox"
                                        name={offer}
                                        checked={checked.includes(offer)}
                                        onChange={handleChange} />
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