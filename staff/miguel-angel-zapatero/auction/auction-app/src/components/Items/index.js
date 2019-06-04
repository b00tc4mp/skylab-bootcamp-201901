import React, { Fragment } from 'react'

function Items({items, onItem}) {
    return <>
        <ul>
            {items && items.map(({ _id, title }) =>  
                //CAMBIAR _id por id en la API!!!!!
                <Fragment key={_id}>
                <li onClick={() => onItem(_id)}>{title}</li>
                </Fragment>
            )}
            {!items || !items.length && <p>Not items found.</p>}
        </ul>
    </>
}

export default Items