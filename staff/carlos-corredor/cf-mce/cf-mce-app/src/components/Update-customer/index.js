import React from 'react'
import './index.sass'


function UpdateCustomer () {

    return (
        <>
         <section className='update-customer'>
            <h1>Update Customer component</h1>
            <form>
                <div >
                    <div >
                        <label for="inputName">Nombre(s)</label>
                        <input type="text" id="inputName" value="" placeholder="ej. María" required/>
                    </div>
                    <div >
                        <label for="inputSurname">Apellido(s)</label>
                        <input type="text" id="inputSurname" value="" placeholder="ej. Pérez"/>
                    </div>    
                </div>
                <div>
                    <div >
                        <label for="inputPhone">Phone</label>
                        <input type="text" id="inputPhone" value="" placeholder="ej. 0415-555-riente"/>
                    </div>
                    <div >
                        <label for="inputAddress">Address</label>
                        <input type="text" id="inputAddress" value="" placeholder="Av. ..."/>
                    </div>                        
                </div>
                <div >
                    <div >
                        <label for="inputNid">Nid</label>
                        <input type="text" id="inputNid" value="" placeholder="V-555.555.555" required/>
                    </div>
                    <div>
                        <label for="inputEmail">Email</label>
                        <input type="email" id="inputEmail" value="" placeholder="ej. perezm@mail.com"/>
                    </div>                        
                </div>

                <button type="submit" >Submit</button>
            </form>
        </section>
        </>
    )
}

export default UpdateCustomer


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register