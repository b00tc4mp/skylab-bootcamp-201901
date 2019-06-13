import React from 'react'
import './index.sass'


function AddBudget () {

    return (
        <>
         <section className='add-budget'>
            <h1>AddBudget component</h1>
            <form>
                <div>
                    <label for="inputDescription">Description</label>
                    <select id="inputDescription">
                        <option>REVISION</option>
                        <option>REPAIR</option>
                        <option>RESTORATION</option>
                        <option>MAINTENANCE</option>
                        <option>SPARES</option>
                        <option>REFUND</option>
                        <option>DISCOUNT</option>
                    </select>
                </div>
                <div>
                    <label for="inputPrice">Price</label>
                    <input type="text" id="inputPrice" pattern="^-?\d+(?:,\d{2}$+)?$" placeholder="ej. 600,02"/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
                
            </form>

        </section>
        </>
    )
}

export default AddBudget


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default AddBudget