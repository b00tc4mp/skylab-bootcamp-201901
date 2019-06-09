import React from 'react'
import './index.scss'

function SelectCategory({ onCategory }) {

    const getCategory = e => {

        const category = e.target.value
        onCategory(category)
    }
    return <>
        <div className="field has-addons">
            <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select className='select-category' onChange={getCategory}>
                        <option value='ENTRANTES' >Entrantes</option>
                        <option value='PACKS'>Packs</option>
                        <option value='FISH_ROLLS'>Fish-rolls</option>
                        <option value='MAKIS'>Makis</option>
                    </select>
                </div>
            </div>
        </div>
        
    </>
}

export default SelectCategory