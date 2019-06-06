import React, { Fragment } from 'react'
import NotResults from '../NotResults'

function Items({items, onItem}) {
    return <>
        <ul>
            {items && items.map(({ id, title }) =>  
                <Fragment key={id}>
                <li onClick={() => onItem(id)}>{title}</li>
                </Fragment>
            )}
            {(!items || !items.length) && <NotResults/>}
        </ul>
    </>
}

export default Items